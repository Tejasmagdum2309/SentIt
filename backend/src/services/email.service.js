import { createTransporter } from "../config/mail.config.js";
import { decryptRefreshToken } from "../config/token-encryption.js";
import {updateCampaignEmailById} from "../services/campaign.service.js";
import { createHttpError } from "../config/http-error.js";

export const sendEmail = async ({ user, to, subject, message }) => {
  const refreshToken = decryptRefreshToken(user?.refreshToken);


  if (!user?.email || !refreshToken) {
    throw new Error("Authenticated Google user with refresh token is required to send email");
  }

  const transporter = await createTransporter({
    email: user.email,
    refreshToken,
  });
  
  try{
    await transporter.verify();
    return transporter.sendMail({
    from: user.email,
    to,
    subject,
    text: message,
  });
} catch (error) {
  console.log("error", error);
  throw createHttpError(500, error.message);
}
};

export const sendCampaignEmailsInBackground = async ({
  campaign,
  emails,
  user,
}) => {
  console.log(`Starting sending mails ------------------------- for campaign ${campaign.id}`);
  for (const campaignEmail of emails) {
    try {
      let body = campaign.emailBody;
      console.log('body');
      for (const [key, value] of Object.entries(campaignEmail.variables)) {
        body = body.replaceAll(`{{${key}}}`, value ?? "");
      }



      const info = await sendEmail({
        user,
        to: campaignEmail.recipientEmail,
        subject: campaign.emailSubject,
        message: body,
      });
      console.log('info', info);

      await updateCampaignEmailById({
        id: campaignEmail.id,
        status: "SENT",
        messageId: info.messageId,
        sentAt: new Date(),
      });
    } catch (error) {
      console.log("error", error);
      await updateCampaignEmailById({
        id: campaignEmail.id,
        status: "FAILED",
        errorMessage: error.message,
      })
    }
  }
};