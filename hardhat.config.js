require("dotenv").config()

// uncomment to include contract sizing in test output
// require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-waffle")
require(`@nomiclabs/hardhat-etherscan`)
require("solidity-coverage")
// uncomment to include gas reporting in test output
//require('hardhat-gas-reporter')
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("@openzeppelin/hardhat-upgrades")
require("./tasks")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

function getMnemonic(networkName) {
    if (networkName) {
        const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()]
        if (mnemonic && mnemonic !== "") {
            return mnemonic
        }
    }

    const mnemonic = process.env.MNEMONIC
    if (!mnemonic || mnemonic === "") {
        return "test test test test test test test test test test test junk"
    }

    return mnemonic
}

function accounts(chainKey) {
    return { mnemonic: getMnemonic(chainKey) }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },

    contractSizer: {
        alphaSort: false,
        runOnCompile: true,
        disambiguatePaths: false,
    },

    namedAccounts: {
        deployer: {
            default: 0, // wallet address 0, of the mnemonic in .env
        },
        proxyOwner: {
            default: 1,
        },
    },

    mocha: {
        timeout: 100000000,
    },

    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: {
            goerli: process.env.ETHERSCAN_API_KEY,
            "telos-testnet": "telos-testnet",
            "fuji": "fuji"
        },
        customChains: [
            {
                network: 'telos-testnet',
                chainId: 41,
                urls: {
                    apiURL: "https://testnet.telos.net/evm",
                    browserURL: "https://teloscan.io",
                },
            },
            {
                network: 'bsc-testnet',
                chainId: 97,
                urls: {
                    apiURL: "wss://bsc-testnet.publicnode.com",
                },
            },
            {
                network: "goerli",
                chainId: 5,
                  urls: {
                    apiURL: "https://api-goerli.etherscan.io/api",
                    browserURL: "https://goerli.etherscan.io"
                  }
            },
            {
                network: "fuji",
                chainId: 43113,
                urls: {
                  apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
                  browserURL: "https://avalanche.testnet.routescan.io"
                }
              }
        ],
    },

    sourcify: {
        enabled: true,
        browserUrl: "https://repo.sourcify.dev",
    },

    networks: {
        ethereum: {
            url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
            chainId: 1,
            accounts: accounts(),
        },
        bsc: {
            url: "https://bsc-dataseed1.binance.org",
            chainId: 56,
            accounts: accounts(),
        },
        avalanche: {
            url: "https://api.avax.network/ext/bc/C/rpc",
            chainId: 43114,
            accounts: accounts(),
        },
        polygon: {
            url: "https://rpc-mainnet.maticvigil.com",
            chainId: 137,
            accounts: accounts(),
        },
        arbitrum: {
            url: `https://arb1.arbitrum.io/rpc`,
            chainId: 42161,
            accounts: accounts(),
        },
        optimism: {
            url: `https://mainnet.optimism.io`,
            chainId: 10,
            accounts: accounts(),
        },
        fantom: {
            url: `https://rpcapi.fantom.network`,
            chainId: 250,
            accounts: accounts(),
        },
        metis: {
            url: `https://andromeda.metis.io/?owner=1088`,
            chainId: 1088,
            accounts: accounts(),
        },

        goerli: {
            url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
            chainId: 5,
            accounts: accounts(),
        },
        "bsc-testnet": {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            accounts: accounts(),
        },
        fuji: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            chainId: 43113,
            accounts: accounts(),
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com/",
            chainId: 80001,
            accounts: accounts(),
        },
        "arbitrum-goerli": {
            url: `https://goerli-rollup.arbitrum.io/rpc/`,
            chainId: 421613,
            accounts: accounts(),
        },
        "optimism-goerli": {
            url: `https://goerli.optimism.io/`,
            chainId: 420,
            accounts: accounts(),
        },
        "fantom-testnet": {
            url: `https://rpc.ankr.com/fantom_testnet`,
            chainId: 4002,
            accounts: accounts(),
        },
        "telos": {
            url: `https://mainnet.telos.net/evm`,
            chainId: 40,
            accounts: accounts(),
        },
        "telos-testnet": {
            url: `https://testnet.telos.net/evm`,
            chainId: 41,
            accounts: accounts(),
        },
    },
}
