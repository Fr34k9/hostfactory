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

    /**
     * Retrieves the list of domains.
     *
     * @return array An array containing the list of domains.
     */
    public function getDomains() {
        $xmlRequest = '<?xml version="1.0" encoding="UTF-8"?>' .
            '<packet version="1.6.9.0">' .
            '<webspace>' .
            '<get>' .
            '<filter/>' .
            '<dataset>' .
            '<gen_info/>' .
            '</dataset>' .
            '</get>' .
            '</webspace>' .
            '</packet>';

        $response = $this->sendApiRequest($xmlRequest);

        $xml = simplexml_load_string($response);
        $domains = [];

        foreach ($xml->webspace->get->result as $domainData) {
            if( count ($domainData ) < 2) {
                continue;
            }
            $data = [];
            $data['id'] = (string) $domainData->id;
            $data['name'] = (string) $domainData->data->gen_info->name;
            $data['status'] = (string) $domainData->data->gen_info->status;
            $data['created'] = (string) $domainData->data->gen_info->cr_date;
            $domains[] = $data;
        }

        return $domains;
    }

    /**
     * Creates a new domain with the specified domain name, FTP user, and FTP password.
     *
     * @param string $domainName The name of the domain to create.
     * @param string $ftpUser The FTP username for the domain.
     * @param string $ftpPassword The FTP password for the domain.
     * @return void
     */
    public function createDomain($domainName, $ftpUser, $ftpPassword) {
        $config = include('config.php');
        $xmlRequest = '<?xml version="1.0" encoding="UTF-8"?>' .
            '<packet version="1.6.9.0">' .
            '<webspace>' .
            '<add>' .
            '<gen_setup>' .
            '<name>' . $domainName . '</name>' .
            '<htype>vrt_hst</htype>' .
            '<ip_address>' . $config->ip . '</ip_address>' .
            '</gen_setup>' .
            '<hosting>' .
            '<vrt_hst>' .
            '<property>' .
            '<name>ftp_login</name>' .
            '<value>' . $ftpUser . '</value>' .
            '</property>' .
            '<property>' .
            '<name>ftp_password</name>' .
            '<value>' . $ftpPassword . '</value>' .
            '</property>' .
            '</vrt_hst>' .
            '</hosting>' .
            '</add>' .
            '</webspace>' .
            '</packet>';

        $response = $this->sendApiRequest($xmlRequest);

        $xml = simplexml_load_string($response);
        
        if( $xml->system->status == 'error') {
            return ['error' => (string) $xml->system->errtext];
        }

        if( $xml->webspace->add->result->status == 'error') {
            return ['error' => (string) $xml->webspace->add->result->errtext];
        }

        return ['success' => 'Domain successfully created.'];
    }

    /**
     * Sends an API request with the given XML request.
     *
     * @param string $xmlRequest The XML request to send.
     * @return mixed The response from the API.
     */
    private function sendApiRequest($xmlRequest) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->pleskUrl . '/enterprise/control/agent.php');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlRequest);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Use carefully in production
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Use carefully in production
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: text/xml',
            'HTTP_AUTH_LOGIN: ' . $this->pleskUsername,
            'HTTP_AUTH_PASSWD: ' . $this->pleskPassword
        ]);

        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
}
