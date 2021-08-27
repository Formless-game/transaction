import erc_abi from "./json/ERC20.json";
import Contract from "web3-eth-contract";
const NODE_HOST = "https://exchaintest.okexcn.com";
export const address = {
  OKB: {
    erc20: "0xda9d14072ef2262c64240da3a93fea2279253611",
  },
  USDT: {
    erc20: "0xe579156f9decc4134b5e3a30a24ac46bb8b01281",
  },
  USDC: {
    erc20: "0x3e33590013b24bf21d4ccca3a965ea10e570d5b2",
  },
  USDK: {
    erc20: "0x533367b864d9b9aa59d0dcb6554df0c89feef1ff",
  },
  BTCK: {
    erc20: "0x09973e7e3914eb5ba69c7c025f30ab9446e3e4e0",
  },
  ETHK: {
    erc20: "0xdf950cecf33e64176ada5dd733e170a56d11478e",
  },
  DOTK: {
    erc20: "0x72f8fa5da80dc6e20e00d02724cf05ebd302c35f",
  },
  FILK: {
    erc20: "0xf6a0dc1fd1d2c0122ab075d7ef93ad79f02ccb93",
  },
  LTCK: {
    erc20: "0xd616388f6533b6f1c31968a305fbee1727f55850",
  },
};

export const initContracts = () => {
  Contract.setProvider(window.ethereum);
  return {
    address: address,
    OKB: {
      erc20: new Contract(erc_abi, address.OKB.erc20),
    },
    USDT: {
      erc20: new Contract(erc_abi, address.USDT.erc20),
    },
    USDC: {
      erc20: new Contract(erc_abi, address.USDC.erc20),
    },
    USDK: {
      erc20: new Contract(erc_abi, address.USDK.erc20),
    },
    BTCK: {
      erc20: new Contract(erc_abi, address.BTCK.erc20),
    },
    ETHK: {
      erc20: new Contract(erc_abi, address.ETHK.erc20),
    },
    DOTK: {
      erc20: new Contract(erc_abi, address.DOTK.erc20),
    },
    FILK: {
      erc20: new Contract(erc_abi, address.FILK.erc20),
    },
    LTCK: {
      erc20: new Contract(erc_abi, address.LTCK.erc20),
    },
  };
};
export const initContractsSend = () => {
  Contract.setProvider(window.ethereum);
  return {
    address: address,
    OKB: {
      erc20: new Contract(erc_abi, address.OKB.erc20),
    },
    USDT: {
      erc20: new Contract(erc_abi, address.USDT.erc20),
    },
    USDC: {
      erc20: new Contract(erc_abi, address.USDC.erc20),
    },
    USDK: {
      erc20: new Contract(erc_abi, address.USDK.erc20),
    },
    BTCK: {
      erc20: new Contract(erc_abi, address.BTCK.erc20),
    },
    ETHK: {
      erc20: new Contract(erc_abi, address.ETHK.erc20),
    },
    DOTK: {
      erc20: new Contract(erc_abi, address.DOTK.erc20),
    },
    FILK: {
      erc20: new Contract(erc_abi, address.FILK.erc20),
    },
    LTCK: {
      erc20: new Contract(erc_abi, address.LTCK.erc20),
    },
  };
};
