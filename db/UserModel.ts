import { DataTypes } from "sequelize";
import sqlz from "./sqlz";

export const User = sqlz.define("User", {
  DiscordId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  goerli_eth: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
  },
  goerli_link: {
    type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
  },
  mumbai_matic: {
    type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
  },
  alfajores_celo: {
    type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
  },
}, {tableName: "faucet_requests"});
