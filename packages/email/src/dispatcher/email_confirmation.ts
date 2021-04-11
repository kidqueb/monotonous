import { htmlToText } from "html-to-text";
import { compileTemplate } from "../compile_template";
import { sendEmail } from "../transport";

const render = compileTemplate("email_confirmation");

export interface ISendEmailConfirmation {
  to: string;
  firstName: string;
  lastName: string;
  token: string;
}

export async function sendEmailConfirmation(params: ISendEmailConfirmation) {
  const html = render(params);
  const text = htmlToText(html);

  const message = {
    from: '"Monotonous" <hello@monotonousrepo.com>',
    to: `${params.firstName} ${params.lastName} <${params.to}>`,
    subject: "Email Confirmation",
    text,
    html,
  };

  return sendEmail(message);
}
