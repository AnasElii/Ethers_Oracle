const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule('SimpleOracleModule', (m) => {
    const simpleOracle = m.contract('SimpleOracle');
    return { simpleOracle };
});
