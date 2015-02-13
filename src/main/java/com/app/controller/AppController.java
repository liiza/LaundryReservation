package com.app.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.app.model.LaundryReservation;
import com.app.service.AppService;


@Controller
public class AppController {

	@Autowired
	AppService service;

	@RequestMapping(method = RequestMethod.POST, value = "", produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<LaundryReservation> createLink() {

		LaundryReservation r = this.service.createReservation();
		return new ResponseEntity<LaundryReservation>(r, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{dateInMilliSeconds}", produces = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<List<LaundryReservation>> getLinks(@PathVariable long dateInMilliSeconds) {
		Date date = new Date(dateInMilliSeconds);
		List<LaundryReservation> list = service.getReservations(date);
		return new ResponseEntity<List<LaundryReservation>>(list, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{reservationId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	ResponseEntity<Void> reserve(@PathVariable long reservationId, @RequestBody LaundryReservation body) {
		// Check that the reservation is not yet reserved.
		LaundryReservation r = this.service.getReservation(reservationId);
		if (r.isReserved()) {
			return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
		}
		this.service.editReservation(body);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
}
