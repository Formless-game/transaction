import BigNumber from "bignumber.js";
import { initContracts, initContractsSend } from "@/cros/common";
import Web3 from "web3";
import errorHandler from "@/cros/errorHandler";
const web3 = new Web3(window.ethereum);
import Vue from "vue";
const contract = initContracts();
const contractSend = initContractsSend();
async function _promise(from, to, input, value = 0, data) {
  let getGasPrice = await web3.eth.getGasPrice();
  return new Promise((resolve, reject) => {
    try {
      web3.eth.sendTransaction(
        {
          from: from,
          to: to,
          value: value,
          input: input,
          gas: 80000,
          gasPrice: parseInt(1.2 * getGasPrice),
        },
        async function (error, res) {
          console.log("txId:", res);
          if (!error) {
            let param = {
              txid: res,
              connection_type: Vue.prototype.$selfFunc.connection_type(),
              product_security_id: data.pid,
              transaction_currency: data.currency,
              transaction_price: data.price,
            };
            // 通知后端存入交易tx
            await Vue.prototype.$http.productOrder({ ...param });
            const tval = setInterval(async () => {
              const tx = await web3.eth.getTransactionReceipt(res);
              if (tx) {
                console.log("tx:", tx);
                clearInterval(tval);
                resolve(tx);
              }
            }, 500);
          } else {
            errorHandler(error);
            reject(error);
          }
        }
      );
    } catch (error) {
      errorHandler(error);
      reject(error);
    }
  });
}

// 获取精度
export const getDecimals = async (xCoin) => {
  return contractSend[xCoin].erc20.methods
    .decimals()
    .call()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      errorHandler(err);
      return false;
    });
};

// 授权
export const contractApprove = async (xCoin, from) => {
  return await contractSend[xCoin].erc20.methods
    .approve(
      contract.address[xCoin].erc20,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .send({ from, gas: 80000 });
};

// 获取资产
export const getBalance = async (xCoin, from) => {
  const decimals = await contractSend[xCoin].erc20.methods.decimals().call();
  return contractSend[xCoin].erc20.methods
    .balanceOf(from)
    .call()
    .then((res) => {
      let amount = new BigNumber(res * 1).dividedBy(`1e${decimals}`).toFixed(8);
      return amount;
    })
    .catch((err) => {
      errorHandler(err);
      return false;
    });
};

// 转账
export const transfer = async (xCoin, amount, from, to, data) => {
  const decimals = await contractSend[xCoin].erc20.methods.decimals().call();
  let amountTotal = new BigNumber(amount)
    .multipliedBy(`1e${decimals}`)
    .toFixed();
  const input = await contractSend[xCoin].erc20.methods
    .transfer(to, amountTotal)
    .encodeABI();
  return _promise(from, to, input, data);
};
// ETH转账
export const transferETH = async (amount, from, to, data) => {
  let amountTotal = web3.utils.toBN(parseInt(amount * 1e18));
  return _promise(from, to, undefined, amountTotal, data);
};

// 获取ETH余额
export const getEthBalance = async (from) => {
  let balance = await web3.eth.getBalance(from);
  if (balance) {
    return BigNumber(balance).div(1e18).toString();
  } else {
    return false;
  }
};
