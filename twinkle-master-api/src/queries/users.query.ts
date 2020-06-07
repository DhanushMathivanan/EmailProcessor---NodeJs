const UserQuery = {
    GetUserByEmpID: `SELECT * from Employee Where EmpID = 1860 `,
    GetUser: `SELECT
	UPPER(U.globalUserID) as globalUserID,
    (U.FirstName || ' ' || U.LastName) AS name,
    U.PHXInitials,
    U.applicationName,
    U.primaryFacilityCode,
    U.applicationName,
    U.isPHXActiveUser,
    U.isUserMigrated,
    (SELECT group_concat(R.Role) FROM UserRoles UR
    INNER JOIN RefRoles R ON UR.RoleID = R.RoleID
    WHERE globalUserID = U.globalUserID
    AND UR.IsActive != 0) as roles,
    (SELECT group_concat(R.RoleId) FROM UserRoles UR
    INNER JOIN RefRoles R ON UR.RoleID = R.RoleID
    WHERE globalUserID = U.globalUserID
    AND UR.IsActive != 0) as roleIds,
    group_concat(P.PrivilegeID) as userPrivilegeIDs,
    group_concat(P.privilege) as userPrivileges,
    group_concat(P.description) as descr,
    group_concat(P.isActive) as isActive
    FROM
    Users U
    LEFT JOIN(SELECT uu.GlobalUserID, rp.PrivilegeID, rp.Privilege, rp.isActive, rp.description FROM UserRolePrivileges urp
        INNER JOIN RefPrivileges rp ON rp.PrivilegeID = urp.PrivilegeID
        INNER JOIN RefRoles rr ON rr.RoleID =  urp.RoleID
        INNER JOIN UserRoles ur ON ur.RoleID = rr.RoleID
        INNER JOIN Users uu on uu.GlobalUserID = ur.GlobalUserID
        where uu.email = :email)as P
    ON U.GlobalUserID = P.GlobalUserID
    INNER JOIN UserNextIds SD ON U.globalUserID LIKE SD.globalUserID
    INNER JOIN UserFunctionalRoles ufr ON ufr.globalUserID = SD.globalUserID and ufr.isActive = 1
	INNER JOIN RefFunctionalRoles rfr ON rfr.FunctionalRoleID = ufr.FunctionalRoleID
    WHERE U.isPHXActiveUser = 1 AND
    (email = :email or :email is null) AND SD.globalUserID <> :globalUserID`,
    GetUserDetail: `SELECT lower(USDS.globalUserID) globalUserID, concat(USR.firstName , ' ' , USR.lastName , ' (' , USR.PHXInitials , ')') as userName
    FROM UserNextIds USDS
    JOIN Users USR ON USR.globalUserID LIKE USDS.globalUserID
    WHERE USDS.globalUserID IN (:globalUserIDs) AND USR.isPHXActiveUser = 1`,
    GetUserById: `SELECT
    UPPER (USDS.globalUserID) as globalUserID,
    (USR.firstName || ' ' || USR.lastName || ' (' || USR.PHXInitials || ')') as userName,
    USR.PHXInitials
    FROM UserNextIds USDS
    JOIN Users USR ON USR.globalUserID LIKE USDS.globalUserID
    WHERE USDS.globalUserID in (:globalUserID) AND USR.isPHXActiveUser = 1`,
    GetUserData: `SELECT
    U.GlobalUserID,
    U.FirstName,
    U.LastName,
    U.PHXInitials,
    U.IFMStaffCode,
    U.IsPHXActiveUser,
    U.CreatedOn,
    U.UpdatedOn,
    U.Email,
    U.PrimaryFacilityCode,
    U.OnLineStatus,
    U.IsOfflineUser,
    U.ApplicationName,
    U.PartnerID,
    U.IsUserMigrated,
    (FirstName || ' ' || LastName) AS displayname,
    (SELECT group_concat(R.Role) FROM UserRoles UR
    LEFT JOIN RefRoles R ON UR.RoleID = R.RoleID
    WHERE globalUserID = U.globalUserID
    AND UR.IsActive != 0) as roles,
    (SELECT group_concat(R.RoleId) FROM UserRoles UR
    LEFT JOIN RefRoles R ON UR.RoleID = R.RoleID
    WHERE globalUserID = U.globalUserID
    AND UR.IsActive != 0) as roleIds,
    group_concat(P.PrivilegeID) as userPrivilegeIDs,
    group_concat(P.privilege) as userPrivileges,
    group_concat(P.description) as descr,
    group_concat(P.isActive) as isActive
    FROM
    Users U
    LEFT JOIN(SELECT uu.GlobalUserID, rp.PrivilegeID, rp.Privilege, rp.isActive, rp.description FROM UserRolePrivileges urp
        INNER JOIN RefPrivileges rp ON rp.PrivilegeID = urp.PrivilegeID
        INNER JOIN RefRoles rr ON rr.RoleID =  urp.RoleID
        INNER JOIN UserRoles ur ON ur.RoleID = rr.RoleID
        INNER JOIN Users uu on uu.GlobalUserID = ur.GlobalUserID
        where uu.globalUserID = :globalUserID)as P
    ON U.GlobalUserID = P.GlobalUserID
    WHERE U.globalUserID = :globalUserID`,
    GetUserMode:  `SELECT USDS.globalUserID as userId, USR.onLineStatus as onLineStatus
    , USR.isOfflineUser as isOfflineUser
    FROM UserNextIds USDS
    INNER JOIN Users USR ON USR.globalUserID LIKE USDS.globalUserID
    WHERE USDS.globalUserID LIKE :globalUserID AND USR.isPHXActiveUser = 1`,
    SetUserMode: `UPDATE
    Users SET OnLineStatus = :onLineStatus, 
    updatedBy = :globalUserID,
    updatedOn = CURRENT_TIMESTAMP
    WHERE globalUserID = :globalUserID AND IsOfflineUser = 1`,
    RemoveContributors: `DELETE FROM MaterialCoCreators
    WHERE materialId = :materialId and materialGlobalUserID = :materialGlobalUserID and CoCreatorGlobalUserID in (:userGlobalUserIDs)`,
    GetPrimaryFacilityCode: `select primaryFacilityCode, globalUserID from Users
    where globalUserID = :globalUserID and isPHXActiveUser = 1`,
    UpdateAppName: `UPDATE Users
    SET
        ApplicationName = :applicationName,
        UpdatedOn = :updatedOn,
        UpdatedBy = :globalUserID
    WHERE
        GlobalUserID = :globalUserID`,
    FetchUsers: `SELECT
        uu.globalUserID,
        uu.partnerId,
        uu.firstName,
        uu.lastName,
        uu.phxInitials,
        group_concat(distinct ur.roleID) as roleId,
        group_concat(distinct rr.role) as role,
        group_concat(distinct paa.perfAsstGlobalUserID) as assistantGlobalUserID,
        group_concat(distinct ua.PHXInitials) as assistantsInitials,
        group_concat(distinct if(concat(IfNULL(ua.FirstName, ''), ' ',IfNULL(ua.LastName, '')) = '', null,
            concat(IfNULL(ua.FirstName, ''), ' ',IfNULL(ua.LastName, ''))) ) as assistantName,
            group_concat(distinct paga.perfAsstGroupID) as groupId,
        group_concat(distinct pag.perfAsstGroupName) as groupName,
        uu.primaryFacilityCode,
        uu.ifmStaffCode,
        uu.email,
        uu.isPHXActiveUser,
        ufr.functionalRoleId,
        fr.functionalRole,
        fr.description
    FROM Users uu
    LEFT JOIN UserRoles ur
        ON uu.GlobalUserID = ur.GlobalUserID AND ur.IsActive = 1
    LEFT JOIN RefRoles rr
        ON rr.RoleID = ur.RoleID
    LEFT JOIN PerfAsstAssignment paa
        ON paa.PerfGlobalUserID = uu.GlobalUserID
    LEFT JOIN Users ua
        ON ua.GlobalUserID = paa.PerfAsstGlobalUserID
    LEFT JOIN PerfAsstGroupAssignment paga
        ON paga.PerfGlobalUserID = uu.GlobalUserID
    LEFT JOIN PerfAsstGroup pag
        ON pag.PerfAsstGroupID = paga.PerfAsstGroupID
    LEFT JOIN UserFunctionalRoles ufr
        ON ufr.GlobalUserID = uu.GlobalUserID AND ufr.IsActive = 1
    LEFT JOIN RefFunctionalRoles fr
        ON fr.FunctionalRoleID = ufr.FunctionalRoleID
    WHERE
        uu.FirstName like :nameLike OR uu.LastName like :nameLike
    GROUP BY uu.GlobalUserID`,
    FetchFunctionalRoles: `SELECT
        fr.functionalRoleId,
        fr.functionalRole,
        fr.description,
        fr.lineageRoleTypeId
    FROM RefFunctionalRoles fr
    WHERE fr.IsActive = 1`,
    AddUserRoles: `INSERT INTO UserRoles (
        RoleID,
        StartDate,
        EndDate,
        IsActive,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        GlobalUserID
    ) values :queryString`,
    RemoveUserRolesTemp: `UPDATE UserRoles SET
        EndDate =:currentDate,
        IsActive = 0,
        UpdatedOn =:currentDate,
        UpdatedBy =:globalUserID
    WHERE RoleID in (:roleIds) and GlobalUserID =:user`,
    RemoveUserRoles: `DELETE FROM UserRoles
    WHERE
        RoleID in (:removeRolesIds) and GlobalUserID =:user`,
    RemoveUserFunctionalRole: `UPDATE UserFunctionalRoles SET
        EndDate =:currentDate,
        IsActive = 0,
        UpdatedOn =:currentDate,
        UpdatedBy =:globalUserID
    WHERE GlobalUserID =:user`,
    AddUserFunctionalRole: `INSERT INTO UserFunctionalRoles (
        FunctionalRoleID,
        StartDate,
        EndDate,
        IsActive,
        CreatedBy,
        CreatedOn,
        UpdatedBy,
        UpdatedOn,
        GlobalUserID
    ) values (
        :functionalRoleID,
        :startDate,
        :endDate,
        :isActive,
        :createdBy,
        :createdOn,
        :updatedBy,
        :updatedOn,
        :globalUserID
    )`,
    PerfAssistantGroupAssignment: `INSERT INTO PerfAsstGroupAssignment (
        PerfGlobalUserID,
        PerfAsstGroupID,
        CreatedBy,
        CreatedOn
    ) values :querystring`,
    RemoveAssistantGroup: `DELETE FROM PerfAsstGroupAssignment
    WHERE
        PerfAsstGroupID in (:removeGroupIds)
    AND
    PerfGlobalUserID =:user`,
    GetPerfumerAssistants: `SELECT
        u.globalUserID,
        concat(IfNULL(u.FirstName, ''), ' ',IfNULL(u.LastName, '')) as assistantName,
        u.phxInitials,
        u.ifmStaffCode,
        u.email,
        ufr.functionalRoleID,
        rfr.functionalRole
    FROM UserFunctionalRoles ufr
    INNER JOIN RefFunctionalRoles rfr
    ON
        rfr.FunctionalRoleID = ufr.FunctionalRoleID
    JOIN Users u
    ON
        u.GlobalUserID = ufr.GlobalUserID
    WHERE
        rfr.FunctionalRole =:functionalRole and ufr.IsActive = 1`,
    AddPerfAssistantsForUser: `INSERT INTO PerfAsstAssignment (
        PerfGlobalUserID,
        PerfAsstGlobalUserID,
        CreatedBy,
        CreatedOn
    ) values :querystring`,
    RemovePerfAssistantsForUser: `DELETE FROM PerfAsstAssignment
    WHERE
    PerfAsstGlobalUserID in (:removeAssistantsIds)
    AND
    PerfGlobalUserID =:user`,
    ToggleUserStatus: `UPDATE Users
    SET
        IsPHXActiveUser =:toggleStatus,
        UpdatedBy = :globalUserID,
        UpdatedOn =:currentDate
    WHERE
        GlobalUserID =:globalUserID`,
    IsActiveUser: `SELECT 1 FROM Users
    WHERE
        email =:emailId and IsPhxactiveUser = 1`,
    GetMenuDetailsByRoles: `
    SELECT * FROM (
        SELECT
        WebSecurity.menuId, WebSecurity.menu, WebSecurity.description,
         CONVERT(
          SUBSTRING_INDEX(
            SUBSTRING_INDEX(WebSecurity.Roles, ',', Numbers.number),
            ',',
            -1), UNSIGNED INTEGER) AS Roles
        FROM
        Numbers INNER JOIN WebSecurity
        ON (CHAR_LENGTH(WebSecurity.Roles) - CHAR_LENGTH(REPLACE(WebSecurity.Roles, ',', ''))) >= Numbers.number - 1
        ORDER BY menuId, Numbers.number, menu, description
    ) AS menu_description_by_roles WHERE menu_description_by_roles.Roles IN (:roleIds)`,
    GetUsersWithPerfumersAssistantRole: `SELECT GlobalUserID
    FROM
        UserFunctionalRoles ufr
    INNER JOIN
        RefFunctionalRoles rfr
    ON
        rfr.FunctionalRoleID = ufr.FunctionalRoleID
    WHERE
        ufr.GlobalUserID in (:globalUserIDs)
    AND
        rfr.FunctionalRole =:perfAsst
    AND
        ufr.IsActive = 1`,
    GetUserDetailsByGlobalUserId: `SELECT UPPER(globalUserID) as globalUserID,
    (SELECT CASE
        WHEN PHXInitials IS NULL OR PHXInitials = ''
            THEN concat(FirstName, ' ', LastName)
        ELSE concat(FirstName, ' ', LastName, ' (',PHXInitials, ')')
        END ) as userName
    from Users where GlobalUserID in (:globalUserIDs)`,
    GetUsersBasedOnPrimaryFacilityCode: `SELECT UPPER(globalUserID) as globalUserID,
    (SELECT CASE
        WHEN PHXInitials IS NULL OR PHXInitials = ''
            THEN concat(FirstName, ' ', LastName)
        ELSE concat(FirstName, ' ', LastName, ' (',PHXInitials, ')')
        END ) as userName
    from Users where PrimaryFacilityCode = :facilitycode AND isPHXActiveUser = 1 AND
    FirstName IS NOT NULL  AND LastName IS NOT NULL order by FirstName `,
    GetAllUsers: `SELECT UPPER(globalUserID) as globalUserID,
    (SELECT CASE
        WHEN PHXInitials IS NULL OR PHXInitials = ''
            THEN concat(FirstName, ' ', LastName)
        ELSE concat(FirstName, ' ', LastName, ' (',PHXInitials, ')')
        END ) as userName
        from Users where isPHXActiveUser = 1 AND FirstName IS NOT NULL  AND LastName IS NOT NULL order by globalUserID`,
    getUsersFunctionalRole: `SELECT rfr.functionalRole, ufr.globalUserID FROM UserFunctionalRoles ufr
    JOIN RefFunctionalRoles rfr ON ufr.FunctionalRoleID = rfr.FunctionalRoleID
    WHERE ufr.globalUserID IN (:users) AND ufr.isactive = 1`,
    GetAllFragSecurityGroups: `Select GroupName from FragSecurityGroup`,
    GetPassportLink: `SELECT PassportDescription, PassportLink, IPC FROM MaterialTSBPassports WHERE IPC IN (:ipc)`
};
export { UserQuery }
