<?php
$data = json_decode(file_get_contents('php://input'), true);
$data = $data['params'];
if(isset($data['message']) && strlen($data['message']) >= 2){
	$message = wordwrap($data['message'], 70, "\r\n");
	$subject = "No Subject";
	if(isset($data['subject']) && strlen($data['subject']) >= 1){
		$subject = $data['subject'];
	}
	$headers = "From: other@none\r\n";
	if(isset($data['email']) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
		$headers .= "Reply-To: " . $data['email'] . "\r\n";
	}
	mail('main@none', $subject, $message, $headers);
	echo json_encode(array('status'=>'success', 'data'=>$data));
	
}else{
	echo json_encode(array('status'=>'error', 'data'=>$data));
}

?>