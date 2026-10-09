# PHP-Anfragen über Resend

`public/anfrage.php` wird mit dem statischen Export öffentlich ausgeliefert. Auf dem Webspace liegt `tw-mailer/` daneben außerhalb von `public_html/`.

In diesen privaten Ordner gehören `mailer.php`, eine Kopie von `config.example.php` als `config.php` und eine private `secrets.php`, die ein PHP-Array mit dem Schlüssel `resend_api_key` zurückgibt. Der API-Schlüssel gehört ausschließlich in diese private Datei. PHP benötigt cURL und Schreibrechte für den privaten Statusordner.

`from` muss eine reine E-Mail-Adresse auf einer bei Resend verifizierten Domain sein; der Anzeigename steht separat in `from_name`. `to` legt den internen Empfänger fest. Erst nach Einrichtung und Prüfung `enabled` auf `true` setzen. Für den Website-Build `NEXT_PUBLIC_INQUIRY_ENDPOINT=/anfrage.php` verwenden.

Pro angenommener Anfrage wird zuerst die interne Mail, danach eine getrennte Eingangsbestätigung versendet. Diese bestätigt keine Buchung. Fehler ausschließlich bei der Eingangsbestätigung werden protokolliert; sie lösen keinen erneuten Versand der internen Anfrage aus.

Lokale Tests: `php -n deploy/hetzner/mailer.test.php`. Sie simulieren den Versand und benötigen keinen API-Schlüssel. Vor produktivem Einsatz die tatsächliche Zustellung beider E-Mails kontrollieren.

Das bereits vorhandene Uploadpaket wird durch Quellcodeänderungen nicht automatisch aktualisiert.
