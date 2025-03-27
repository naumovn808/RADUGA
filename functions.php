<?php

$mail_settings = [
  'host'       => 'smtp.gmail.com',
  'auth'       => true,
  'username'   => 'radugamartkor@gmail.com',
  'password'   => 'radugA123@',
  'SMTPSecure' => 'ssl',
  'port'       => 465,
  'from'       => 'radugamartkor@gmail.com',
  'addAddress' => 'naumovn808@gmail.com'
];

function clean($value = "")
{
  $value = trim($value);
  $value = stripslashes($value);
  $value = strip_tags($value);
  $value = htmlspecialchars($value);

  return $value;
}

function check_length($value = "", $min, $max)
{
  $result = (mb_strlen($value) <= $min || mb_strlen($value) > $max);
  return !$result;
}