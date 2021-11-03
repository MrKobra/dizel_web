<?php
$to = 'info@toka-net.net';
$title = 'Заявка с сайта prof-arenda.ru';
$message = '';
$result = false;
if(isset($_POST['name'])) {
    $message .= '<p><strong>Имя: </strong>'.$_POST['name'].'</p>';
}
if(isset($_POST['email'])) {
    $message .= '<p><strong>E-mail: </strong>'.$_POST['email'].'</p>';
}
if(isset($_POST['phone'])) {
    $message .= '<p><strong>Телефон: </strong>'.$_POST['phone'].'</p>';
}
if(isset($_POST['msg'])) {
    $message .= '<p><strong>E-mail: </strong>'.$_POST['msg'].'</p>';
}
if(isset($_POST['item'])) {
    if(!empty($_POST['item'])) {
        $message .= '<p><strong>Пушка: </strong>'.$_POST['item'].'</p>';
    }
}
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: PROF ARENDA <no-reply@prof-arenda.ru>' . "\r\n";
if(mail($to, $title, $message, $headers)) {
    $result = true;
}
echo json_encode($result);