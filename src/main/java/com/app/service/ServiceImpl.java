package com.app.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TemporalType;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.model.Reservation;

@Service
public class ServiceImpl implements AppService{

	@PersistenceContext
	EntityManager em;
	
	@Transactional
	public void addReservation(Reservation r) {

		
	}

	@Transactional
	public Reservation createReservation() {
		Reservation r = new Reservation();
		em.persist(r);
		return r;
	}

	@Transactional
	public void editReservation(Reservation r) {
		em.merge(r);
	}

	@Transactional
	public void removeReservation(long id) {
		// TODO Auto-generated method stub
		
	}

	@Transactional
	public Reservation getReservation(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("deprecation")
	@Transactional
	public List<Reservation> getReservations(Date date) {
		// TODO Auto-generated method stub
		// TODO if list is empty, create it
		Query jpqlQuery = em.createQuery("FROM Reservation as reservation " + 
				"WHERE reservation.date LIKE :date")
				.setParameter("date", date, TemporalType.DATE);
				
		List<Reservation> results = jpqlQuery.getResultList();
        
		if (results.isEmpty()) {
			for (int i = 8; i < 21; i++) {
				Reservation r = new Reservation();
				results.add(r);
				r.setDay(date);
				r.setTime(i);
				em.persist(r);
			}
		}
		return  jpqlQuery.getResultList();
	}

}
