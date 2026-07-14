import { sendEmail } from "../services/email.service.js";

export const sendEmailController = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    const info = await sendEmail({
      user: req.user,
      to,
      subject,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};