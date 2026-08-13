

package com.jinhani.repofit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jinhani.repofit.entity.PacketEntity;

public interface PacketRepository
    extends JpaRepository<PacketEntity, Long> {
}