using System.Net;
using System.Net.Mail;
 
public class EmailSender : IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string message)
    {

        var mail = "gimysmonstera@gmail.com";
        var password = "ohsfxmmwbtccgjit";


        var client = new SmtpClient
        {
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            EnableSsl = true,

            Host = "smtp.gmail.com",
            Port = 587,
            
            Credentials = new NetworkCredential(mail, password)
        };
 
        return client.SendMailAsync(
            new MailMessage(from: mail,
                            to: email,
                            subject,
                            message
                            ));
    }
}