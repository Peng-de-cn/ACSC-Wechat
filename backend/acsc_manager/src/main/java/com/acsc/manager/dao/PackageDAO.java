package com.acsc.manager.dao;

import com.acsc.commons.entity.ActivityPackage;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PackageDAO {

    void insertPackages(@Param("packages") List<ActivityPackage> packages);

    void delPackagesByActivityId(String activityId);

}
