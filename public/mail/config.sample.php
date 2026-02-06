<?php
return [
    'smtp' => [
        'host' => 'mail.weshow.su',
        'port' => 465,
        'encryption' => 'ssl', // ssl или tls
        'username' => 'info@weshow.su',
        'password' => 'CHANGE_ME',
        'allow_insecure' => false, // true только если нужен SMTP по IP
    ],
    'mail' => [
        'from' => 'info@weshow.su',
        'from_name' => 'WESHOW',
        'to' => ['info@weshow.su'],
    ],
];
