<?php

/**
 * Class DomainManager
 * 
 * This class handles the management of domains.
 */
class DomainManager {
    private $pleskUrl;
    private $pleskUsername;
    private $pleskPassword;

    public function __construct($pleskUrl, $pleskUsername, $pleskPassword) {
        $this->pleskUrl = $pleskUrl;
        $this->pleskUsername = $pleskUsername;
        $this->pleskPassword = $pleskPassword;
    }

    public function getDomains() {
        
    }

    public function createDomain($domainName, $ftpUser, $ftpPassword) {
        
    }

    private function sendApiRequest($xmlRequest) {
        
    }
}
