<?php
require_once 'class-domain-manager.php';

class Api {
    private $domainManager;

    public function __construct() {
        $config = include('config.php');
        $this->domainManager = new DomainManager($config->url, $config->username, $config->password);
    }

    /**
     * Creates a domain account with the specified domain name, FTP username, and FTP password.
     *
     * @param string $domainName The name of the domain.
     * @param string $ftpUsername The username for the FTP account.
     * @param string $ftpPassword The password for the FTP account.
     * @return void
     */
    public function createDomainAccount($domainName, $ftpUsername, $ftpPassword) {
        $result = $this->domainManager->createDomain($domainName, $ftpUsername, $ftpPassword);
        return json_encode($result);
    }

    /**
     * Retrieves the domain accounts.
     *
     * This method fetches the domain accounts from the backend.
     *
     * @return array An array containing the domain accounts.
     */
    public function getDomainAccounts() {
        $result = $this->domainManager->getDomains();
        return json_encode($result);
    }

    /**
     * Handles the request and performs the specified action.
     *
     * @param string $action The action to be performed.
     * @return void
     */
    public function handleRequest($action) {
        switch ($action) {
            case 'createDomainAccount':
                $domainName = !empty( $_POST['domainName'] ) ? $_POST['domainName'] : '';
                $ftpUsername = !empty( $_POST['ftpUsername'] ) ? $_POST['ftpUsername'] : '';
                $ftpPassword = !empty( $_POST['ftpPassword'] ) ? $_POST['ftpPassword'] : '';
                echo $this->createDomainAccount($domainName, $ftpUsername, $ftpPassword);
                break;

            case 'getDomainAccounts':
                echo $this->getDomainAccounts();
                break;

            default:
                echo json_encode(['error' => 'Ungültige Aktion']);
        }
    }
}

$api = new Api();
$action = !empty( $_POST['action'] ) ? $_POST['action'] : '';
$api->handleRequest($action);