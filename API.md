## Comunicação com o servidor

A interface vai se comunicar com o servidor via websocket (socket.io) e enviará e receberá eventos.

Lista dos eventos enviados/recebidos pelo servidor (em formarto JSON):

* ```USER_CONNECT```: informa ao servidor que o usuário se conectou e está disponível para receber as chamadas.
  * Dados:

      ```javascript
      {
        "username": "nome do usuário",
        "maxCalls": 8 
      }
      ```

      "maxCalls" = Número máximo de chamadas que o servidor enviará para o usuário

  * ```USER_CONNECTED```: evento enviado pelo servidor caso a conexão do usuário ocorra com sucesso:

    ```javascript
    {
      "username": "nome do usuário",
      "maxCalls": 8
    }
    ```

  * ```USER_CONNECTION_ERROR```: evento enviado pelo servidor caso ocorrer falha na conexão do usuário:

    ```javascript
    {
      "username": "nome do usuário",
      "maxCalls": 8,
      "error": "Mensagem de erro"
    }
    ```

* ```USER_DISCONNECT```: informa o servidor que o usuário se desconectou e, portanto não está mais disponível para receber chamadas.
  * Dados:

      ```javascript
      {
        "username": "nome do usuário"
      }
      ```

  * ```USER_DISCONNECTED```: evento enviado pelo servidor caso a desconexão do usuário ocorra com sucesso:

    ```javascript
    {
      "username": "nome do usuário"
    }
    ```

  * ```USER_DISCONNECTION_ERROR```: evento enviado pelo servidor caso ocorrer falha na desconexão do usuário:

    ```javascript
    {
      "username": "nome do usuário"
      "error": "Mensagem de erro"
    }
    ```

* ```NEW_CALL```: servidor informa o usuário que tem uma nova chamada para ele;
  * Dados:

      ```javascript
      {
        "callId": "identificador da chamada"
        "media": "CHAT",
        "startDate": Date,
        "service": "Nome do serviço vinculado à chamada",
        "caller": "Nome da pessoa que originou a chamada" 
      }
      ```

  * ```NEW_CALL_ANSWERED```: evento que deve ser enviado para o servidor caso a chamada seja recebida com sucesso pelo usuário:

    ```javascript
    {
      "callId": "identificador da chamada"
    }
    ```

  * ```NEW_CALL_ERROR```: evento que deve ser enviado para o servidor em caso de falha no recebimento da nova chamada pelo usuário:

    ```javascript
    {
      "callId": "identificador da chamada",
      "error": "Mensagem de erro"
    }
    ```

* ```END_CALL```: evento que deve ser enviado para o servidor para encerrar a chamada em andamento;
  * Dados:

      ```javascript
      {
        "callId": "identificador da chamada"
      }
      ```

  * ```CALL_ENDED```: evento que o servidor vai enviar caso a chamada seja encerrada com sucesso:

    ```javascript
    {
      "callId": "identificador da chamada"
    }
    ```

  * ```END_CALL_ERROR```: evento que o servidor vai enviar caso aconteça alguma falha ao encerrar a chamada:

    ```javascript
    {
      callId: "identificador da chamada"
      error: "Mensagem de erro"
    }
    ```
