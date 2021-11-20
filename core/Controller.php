<?php

namespace Core;


use App\Models\Smtp;

class Controller extends Bootstrap
{
    public function view($view, $data = [])
    {
        return $this->view->show($view, $data);
    }


    public function mailSend($userMail, $subject, $username, $body)
    {
        try {
            $settings = Smtp::find(1);
//            $password = otherPassSalt($settings->mail_password);
            $password= 123;

            $this->mailer->SMTPDebug = 0;
            $this->mailer->isSMTP();

            $this->mailer->Host = $settings->mail_host;
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $settings->mail_username;
            $this->mailer->Password = $password;
            $this->mailer->CharSet = 'UTF-8';
            $this->mailer->SMTPSecure = false;
            $this->mailer->SMTPAutoTLS = false;
            $this->mailer->Port = $settings->port;
            $this->mailer->SMTPKeepAlive = true;


            $this->mailer->setFrom($this->mailer->Username, $subject);
            $this->mailer->addAddress($userMail, $username); //kime gönderiliyor

            $this->mailer->isHTML();
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $body;

            if ($this->mailer->send()) {
                return ['status' => true];
            } else {
                return ['status' => false, 'message' => 'Mail not send'];
            }
        } catch (Exception $e) {
            return ['status' => false, 'message' => $this->mailer->ErrorInfo];
        }
    }
}
?>
