![Logo](frontend/assets/img/logo.svg)

# Domain Manager
Applikation um Domains in einem Plesk-Account aufzulisten & hinzuzufügen

* [Demo](#demo)
* [Aufgabe](#aufgabe)
    * [Umgebungsbedingungen](#umgebungsbedingungen)
    * [Funktionalitäten](#funktionalitäten)
    * [Technische Anforderungen](#technische-anforderungen)
* [Problems](#problems)

## Demo
See [cédricsteiger.ch](https://cédricsteiger.ch)

## Aufgabe
Für die Umsetzung der Aufgabe steht ein VPS 'WebEdition' mit vorinstalliertem Plesk, sowie ein Hostfactory Standard Webhosting inkl. Domain zur Verfügung. Alle Details zu diesen Services können in unserem 'my.hostfactory'-Kundencenter eingesehen werden.

### Umgebungsbedingungen

- Die Veröffentlichung der Webanwendung erfolgt auf dem bereitgestellten Domain-Account.
- Plesk ist bereits auf dem bereitgestellten VPS vorinstalliert.

### Funktionalitäten

-  Domain-Account erstellen:
    - Formular zur Eingabe: Domainname, FTP-Benutzername und Passwort
    - API-Anfrage an den Plesk-Server zur Erstellung des Domain-Accounts.
    - Rückmeldung an den Benutzer.
- Auflisten bestehender Domain-Accounts:
    - Anzeige einer Liste aller bestehenden Domain-Accounts (Domainname, Erstelldatum und Status).
    - API-Anfrage an den Plesk-Server, um die Domain-Liste abzurufen.

### Technische Anforderungen

- Backend: Umgesetzt in PHP.
- Nutzung von HTML, CSS und gegebenenfalls JavaScript für das Frontend.
- Verwendung der Plesk XML API als Schnittstelle, welche auf dem Server bereitgestellt wird.

## Problems
- API erstellt Domain obwohl Fehlermeldung vorhanden
- Status der Websites ist immer 0 - Daher werden diese immer als "inaktiv" angezeigt