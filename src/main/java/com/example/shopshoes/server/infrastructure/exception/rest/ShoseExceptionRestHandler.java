package com.example.shopshoes.server.infrastructure.exception.rest;

import com.example.shopshoes.server.infrastructure.exception.ShoseExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class ShoseExceptionRestHandler<Z extends Exception> extends ShoseExceptionHandler<ResponseEntity<?>, Z> {

    @Override
    protected ResponseEntity<?> wrap(Z ex) {
        return new ResponseEntity<>(wrapApi(ex), HttpStatus.BAD_REQUEST);
    }

    protected abstract Object wrapApi(Z ex);
}
