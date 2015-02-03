package com.app.service;

import java.util.Date;
import java.util.List;

import com.app.model.LaundryReservation;

public interface AppService {
	public void addReservation(LaundryReservation r);
	public LaundryReservation createReservation();
	public void editReservation(LaundryReservation r);
	public void removeReservation(long id);
	public LaundryReservation getReservation(long id);
	public List<LaundryReservation> getReservations(Date date);
	
}
