package com.app.model;

import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LaundryReservation {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private boolean reserved;
	
	private Date date;
	
	private long time;

	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public boolean isReserved() {
		return reserved;
	}

	public void setReserved(boolean reserved) {
		this.reserved = reserved;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date day) {
		this.date = day;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}
	
}
