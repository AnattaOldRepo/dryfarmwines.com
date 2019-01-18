import { rechargeUrl, previewThemeQuery } from "../../config.js";

export const resetUrls = customerHash => {
  return {
    subscription: `${rechargeUrl}${customerHash}${previewThemeQuery}`,
    details: `${rechargeUrl}${customerHash}${previewThemeQuery}/#/details`,
    history: `${rechargeUrl}${customerHash}${previewThemeQuery}/#/history`,
    rechargeEdit: `${rechargeUrl}${customerHash}/edit${previewThemeQuery}`,
    rechargeCard: `${rechargeUrl}${customerHash}/card${previewThemeQuery}`
  };
};
