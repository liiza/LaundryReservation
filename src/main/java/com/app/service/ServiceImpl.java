package com.app.service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TemporalType;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.model.LaundryReservation;

@Service
public class ServiceImpl implements AppService{

	@PersistenceContext
	EntityManager em;
	
	@Transactional
	public void addReservation(LaundryReservation r) {

		
	}

	@Transactional
	public LaundryReservation createReservation() {
		LaundryReservation r = new LaundryReservation();
		em.persist(r);
		return r;
	}

	@Transactional
	public void editReservation(LaundryReservation r) {
		em.merge(r);
	}

	@Transactional
	public void removeReservation(long id) {
		// TODO Auto-generated method stub
		
	}

	@Transactional
	public LaundryReservation getReservation(long id) {
		LaundryReservation r = em.find(LaundryReservation.class, id);
		return r;
	}

	@SuppressWarnings("deprecation")
	@Transactional
	public List<LaundryReservation> getReservations(Date date) {
		// TODO Auto-generated method stub
		// TODO if list is empty, create it
		Query jpqlQuery = em.createQuery("FROM LaundryReservation as reservation " + 
				"WHERE reservation.date = :date ORDER BY reservation.time")
				.setParameter("date", date, TemporalType.DATE);
				
		List<LaundryReservation> results = jpqlQuery.getResultList();
        
		if (results.isEmpty()) {
			for (int i = 8; i < 21; i++) {
				LaundryReservation r = new LaundryReservation();
				results.add(r);
				r.setDate(date);
				r.setTime(i);
				em.persist(r);
			}
		}
		return results;
	}

}
