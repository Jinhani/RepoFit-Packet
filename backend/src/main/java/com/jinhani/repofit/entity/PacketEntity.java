package com.jinhani.repofit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PacketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String companyName;

    @Column(nullable = false, length = 20000)
    private String jobPostingText;

    protected PacketEntity() {
    }

    public PacketEntity(
        String companyName,
        String jobPostingText
    ) {
        this.companyName = companyName;
        this.jobPostingText = jobPostingText;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getJobPostingText() {
        return jobPostingText;
    }
}