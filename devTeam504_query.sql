CREATE DATABASE dev504;


USE dev504;


CREATE TABLE clientes(
	id INT IDENTITY(1,1) NOT NULL,
	nombres NVARCHAR(100) NOT NULL,
	apellidos NVARCHAR(100) NOT NULL,
	identidad NVARCHAR(20) NOT NULL,
	fecha_creacion DATETIME NOT NULL CONSTRAINT df_cliente_fecha_creacion  DEFAULT(GETDATE()),
	CONSTRAINT pk_cliente_id PRIMARY KEY (id),
	CONSTRAINT uq_cliente_identidad UNIQUE(identidad)
);



CREATE TABLE cliente_direcciones(
	id INT IDENTITY(1,1) NOT NULL,
	id_cliente INT NOT NULL,
	direccion NVARCHAR(100) NOT NULL,
	fecha_creacion DATETIME NOT NULL CONSTRAINT df_cliente_direccion_fecha_creacion  DEFAULT(GETDATE()),
	CONSTRAINT pk_cliente_direcciones_id PRIMARY KEY (id),
	CONSTRAINT fk_cliente_id FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);


CREATE PROC sp_cliente_crear(
	@nombres varchar(100),
	@apellidos varchar(100),
	@identidad varchar(20),
	@direccion varchar(100)
)
AS 
BEGIN
	
	DECLARE @id_cliente INT;

	BEGIN TRY 

		BEGIN TRAN;
			INSERT INTO clientes
			(
				nombres,
				apellidos,
				identidad
			)
			VALUES
			(
				@nombres,
				@apellidos,
				@identidad
			);

			SET @id_cliente = SCOPE_IDENTITY();

			INSERT INTO cliente_direcciones
			(
				id_cliente,
				direccion
			)
			VALUES
			(
				@id_cliente,
				@direccion
			);

		COMMIT;
		SELECT 
		  id AS id_cliente, 
		  nombres, 
		  apellidos  
		  FROM clientes WHERE id = @id_cliente;


		RETURN 1;
	END TRY
	BEGIN CATCH 
		SELECT  
            ERROR_NUMBER() AS ErrorNumber  
            ,ERROR_SEVERITY() AS ErrorSeverity  
            ,ERROR_STATE() AS ErrorState  
            ,ERROR_PROCEDURE() AS ErrorProcedure  
            ,ERROR_LINE() AS ErrorLine  
            ,ERROR_MESSAGE() AS ErrorMessage;  
		ROLLBACK;
		RETURN -1;
	END CATCH 
END;
GO

CREATE PROC sp_cliente_actualizar(
    @id_cliente int,
	@nombres varchar(100),
	@apellidos varchar(100),
	@identidad varchar(20)
)
AS 
BEGIN
	
	IF NOT EXISTS (SELECT 1 FROM clientes WHERE id = @id_cliente) 
	BEGIN
		SELECT 'Cliente no existe' AS mensaje;
		RETURN 0
	END;


	BEGIN TRY 

		BEGIN TRAN;
			UPDATE clientes 
			SET nombres = @nombres,
			apellidos = @apellidos,
			identidad = @identidad
			WHERE id = @id_cliente;
		COMMIT;
		SELECT 
		  id AS id_cliente, 
		  nombres, 
		  apellidos  
		  FROM clientes WHERE id = @id_cliente;


		RETURN 1;
	END TRY
	BEGIN CATCH 
		SELECT  
            ERROR_NUMBER() AS ErrorNumber  
            ,ERROR_SEVERITY() AS ErrorSeverity  
            ,ERROR_STATE() AS ErrorState  
            ,ERROR_PROCEDURE() AS ErrorProcedure  
            ,ERROR_LINE() AS ErrorLine  
            ,ERROR_MESSAGE() AS ErrorMessage;  
		ROLLBACK;
		RETURN -1;
	END CATCH 
END;
GO


CREATE PROC sp_clientes_listar
AS 
BEGIN
		  SELECT 
		  id AS id_cliente, 
		  nombres, 
		  apellidos  
		  FROM clientes;

		RETURN 1;
END;
GO


CREATE PROC sp_cliente_obtener
(
	@id_cliente int
)
AS 
BEGIN

		  
		  SELECT 
		  id AS id_cliente, 
		  nombres, 
		  apellidos  
		  FROM clientes WHERE id = @id_cliente;

		RETURN 1;
END;
GO



CREATE PROC sp_cliente_eliminar(
	@id_cliente int
)
AS 
BEGIN

	IF NOT EXISTS (SELECT 1 FROM clientes WHERE id = @id_cliente) 
	BEGIN
		SELECT 'Cliente no existe' AS mensaje;
		RETURN 0
	END;

	BEGIN TRY 

		BEGIN TRAN;

			DELETE FROM cliente_direcciones where id_cliente = @id_cliente;
			
			DELETE FROM clientes WHERE id = @id_cliente;

		COMMIT;
		SELECT 'Cliente eliminado' as mensaje;
		RETURN 1;
	END TRY
	BEGIN CATCH 
		SELECT  
            ERROR_NUMBER() AS ErrorNumber  
            ,ERROR_SEVERITY() AS ErrorSeverity  
            ,ERROR_STATE() AS ErrorState  
            ,ERROR_PROCEDURE() AS ErrorProcedure  
            ,ERROR_LINE() AS ErrorLine  
            ,ERROR_MESSAGE() AS ErrorMessage;  
		ROLLBACK;
		RETURN -1;
	END CATCH 
END;
GO





