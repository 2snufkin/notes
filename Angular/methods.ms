/**
   * build URL with parameters from an object
   * @param options l'options que l'utilisateur souhaite inclure dans le pdf
   * @param etudeId l'identifiant de l'étude
   * @return string. example: api/2/etude-export/fr/etude=true&sv=true&parametrage=false
   */
  buildPdfParameters(options, etudeId){
    const queryParams = Object.keys(options).map(key => key + '=' + options[key]).join('&');
    return 'api/' + etudeId + '/etude-export/' + this.language +  '/' + queryParams;
   }
