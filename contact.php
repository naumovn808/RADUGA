<?php

require 'class.phpmailer.php';
require 'class.smtp.php';
require 'functions.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$comment = $_POST['comment'] ?? '';

$errors = [];

if (empty($name) || !check_length($name, 2, 50)) {
  $errors['name'] = 'Введите корректное имя (2-50 символов).';
}

if (empty($email) || !check_length($email, 9, 50) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Введите корректный email';
}

if (!empty($errors)) {

  echo json_encode(['error' => $errors]);
  exit;
}

$mail = new PHPMailer;
$mail->CharSet = "UTF-8";
$mail->isSMTP();
$mail->Host = $mail_settings['host'];
$mail->SMTPAuth = $mail_settings['auth'];
$mail->Username = $mail_settings['username'];
$mail->Password = $mail_settings['password'];
$mail->SMTPSecure = $mail_settings['SMTPSecure'];
$mail->Port = $mail_settings['port'];
$mail->setFrom($mail_settings['from']);
$mail->addAddress($mail_settings['addAddress']);

$html = file_get_contents('contact-template.html');
$html = str_replace('NAME', $name, $html);
$html = str_replace('COMMENT', $comment, $html);
$html = str_replace('EMAIL', $email, $html);
$body = $html;

$mail->isHTML(true);
$mail->Subject = "Заявка с сайта";
$mail->Body = $body;


if (!$mail->send()) {

  header('HTTP/1.1 500 Internal Server Error', true, 500);

  exit;
} else {
  echo json_encode(['success' => true]);
}
