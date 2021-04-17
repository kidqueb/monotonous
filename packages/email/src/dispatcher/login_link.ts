import { htmlToText } from "html-to-text";
import { compileTemplate } from "../compile_template";
import { sendEmail } from "../transport";

const render = compileTemplate("login_link");

export interface ISendLoginLink {
  to: string;
  firstName: string;
  lastName: string;
  code: string;
}

export async function sendLoginLink(params: ISendLoginLink) {
  const html = render(params);
  const text = htmlToText(html);

  const message = {
    from: '"Monotonous" <hello@monotonousrepo.com>',
    to: `${params.firstName} ${params.lastName} <${params.to}>`,
    subject: "Monotonous Login",
    text,
    html,
  };

  return sendEmail(message);
}
