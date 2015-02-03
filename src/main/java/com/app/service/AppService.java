package com.app.service;

import java.util.Date;
import java.util.List;

import com.app.model.Reservation;

public interface AppService {
	public void addReservation(Reservation r);
	public Reservation createReservation();
	public void editReservation(Reservation r);
	public void removeReservation(long id);
	public Reservation getReservation(long id);
	public List<Reservation> getReservations(Date date);
	
}
