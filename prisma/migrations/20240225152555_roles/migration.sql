-- AlterTable
ALTER TABLE "Role" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- InitialData
INSERT INTO "Role" (name, "updatedAt") VALUES ('user', now());
INSERT INTO "Role" (name, "updatedAt") VALUES ('admin', now());
INSERT INTO "Role" (name, "updatedAt") VALUES ('super-admin', now());

-- CreateRoleFunction
DROP FUNCTION IF EXISTS fnc_create_role(role_name varchar);

CREATE FUNCTION fnc_create_role(role_name varchar)
    RETURNS INTEGER
    LANGUAGE plpgsql
AS
$$
DECLARE returned_value INTEGER = -1;
BEGIN
    INSERT INTO "Role" (name, "updatedAt")
    VALUES (role_name, now())
    RETURNING id INTO returned_value;

    RETURN returned_value;
END
$$;

-- GetAllRolesFunction
DROP FUNCTION IF EXISTS fnc_get_all_roles();

CREATE FUNCTION fnc_get_all_roles()
    RETURNS TABLE(
        id integer,
        name text,
        "isActive" boolean,
        "createdAt" timestamp,
        "updatedAt" timestamp
    )
    LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
        SELECT r.id, r.name, r."isActive", r."createdAt", r."updatedAt"
        FROM "Role" r;
END
$$;

-- GetActiveRolesFunction
DROP FUNCTION IF EXISTS fnc_get_active_roles();

CREATE FUNCTION fnc_get_active_roles()
    RETURNS TABLE(
        id integer,
        name text,
        "createdAt" timestamp,
        "updatedAt" timestamp
    )
    LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
        SELECT r.id, r.name, r."createdAt", r."updatedAt"
        FROM "Role" r
        WHERE r."isActive" = true;
END
$$;

-- UpdateRoleByIdFunction
DROP FUNCTION IF EXISTS fnc_update_role_by_id(role_id integer, is_active boolean);

CREATE FUNCTION fnc_update_role_by_id(role_id integer, is_active boolean)
    RETURNS INTEGER
    LANGUAGE plpgsql
AS
$$
DECLARE returned_value INTEGER = -1;
BEGIN
    UPDATE "Role"
    SET "isActive" = is_active
    WHERE id = role_id
    RETURNING id INTO returned_value;

    RETURN returned_value;
END
$$;

-- DeleteRoleByIdFunction
DROP FUNCTION IF EXISTS fnc_delete_role_by_id(role_id integer);

CREATE FUNCTION fnc_delete_role_by_id(role_id integer)
    RETURNS INTEGER
    LANGUAGE plpgsql
AS
$$
DECLARE returned_value INTEGER = -1;
BEGIN
    DELETE FROM "Role" r
    WHERE r.id = role_id
    RETURNING id INTO returned_value;

    RETURN returned_value;
END
$$;
