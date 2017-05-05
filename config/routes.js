var route = require('../controllers');
var passport = require('passport');
var settings = require('./settings');

module.exports = function (app) {
  var checkPermission = function(permissionName){
    return [
      // Check general login
      passport.authenticate('bearer', { session: false }),
      // Check current user permission
      function(req, res, next){
         req.user.havePermission(permissionName, function(err, isAllowed){
           if(err){
             res.send({ error: 'internal' });
           } else if(isAllowed){
             next();
           } else {
             res.status(401).send('Unauthorized');
           }
         });
      }
    ];
  };
  var downloadCheckPermission = function(permissionName){
    var params = checkPermission(permissionName);
    params.unshift(function(req, res, next){
        if(req.query.token){
            req.headers.authorization = decodeURI(req.query.token);
            delete req.query;
        }
        next();
    });
    params.push(function(req, res, next){
        res.setHeader('Content-Disposition', 'attachment');
        next();
    });
    return params;
  };
  /**
   * @api {get} /rol/permisos ABM Permisos disponibles
   * @apiName PermissionList
   * @apiGroup Rol
   * @apiVersion 0.1.0
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data  Devuelve el listado de todos los permisos asignables en esta aplicacion.
   */
  app.get('/rol/permisos', function(req, res){
    res.send({
      success: true,
      data: [
        // Moneda
        { nombre: 'moneda.add', label: 'Crear Moneda', group: 'Moneda' },
        { nombre: 'moneda.change', label: 'Editar Moneda', group: 'Moneda' },
        { nombre: 'moneda.delete', label: 'Borrar Moneda', group: 'Moneda' },
        { nombre: 'moneda.history', label: 'Historial Moneda', group: 'Moneda' },
        // Cotizacion Moneda
        { nombre: 'cotizacionMoneda.add', label: 'Crear Cotizacion Moneda', group: 'Cotizacion Moneda' },
        { nombre: 'cotizacionMoneda.history', label: 'Historial Cotizacion Moneda', group: 'Cotizacion Moneda' },
        { nombre: 'cotizacionMoneda.delete', label: 'Borrar Cotizacion Moneda', group: 'Cotizacion Moneda' },
        { nombre: 'cotizacionMoneda.change', label: 'Editar Cotizacion Moneda', group: 'Cotizacion Moneda' },
        // Pais
        { nombre: 'pais.add', label: 'Crear Pais', group: 'Pais' },
        { nombre: 'pais.history', label: 'Historial Pais', group: 'Pais' },
        { nombre: 'pais.delete', label: 'Borrar Pais', group: 'Pais' },
        { nombre: 'pais.change', label: 'Editar Pais', group: 'Pais' },
        // Mercado
        { nombre: 'mercado.add', label: 'Crear Mercado', group: 'Mercado' },
        { nombre: 'mercado.history', label: 'Historial Mercado', group: 'Mercado' },
        { nombre: 'mercado.delete', label: 'Borrar Mercado', group: 'Mercado' },
        { nombre: 'mercado.change', label: 'Editar Mercado', group: 'Mercado' },
        // Benchmark
        { nombre: 'benchmark.add', label: 'Crear Benchmark', group: 'Benchmark' },
        { nombre: 'benchmark.history', label: 'Historial Benchmark', group: 'Benchmark' },
        { nombre: 'benchmark.delete', label: 'Borrar Benchmark', group: 'Benchmark' },
        { nombre: 'benchmark.change', label: 'Editar Benchmark', group: 'Benchmark' },
        // Duration
        { nombre: 'duration.add', label: 'Crear Duration', group: 'Duration' },
        { nombre: 'duration.history', label: 'Historial Duration', group: 'Duration' },
        { nombre: 'duration.delete', label: 'Borrar Duration', group: 'Duration' },
        { nombre: 'duration.change', label: 'Editar Duration', group: 'Duration' },
        // Region
        { nombre: 'region.add', label: 'Crear Region', group: 'Region' },
        { nombre: 'region.history', label: 'Historial Region', group: 'Region' },
        { nombre: 'region.delete', label: 'Borrar Region', group: 'Region' },
        { nombre: 'region.change', label: 'Editar Region', group: 'Region' }, 
        // Tipo Renta
        { nombre: 'tipoRenta.add', label: 'Crear Tipo Renta', group: 'Tipo Renta' },
        { nombre: 'tipoRenta.history', label: 'Historial Tipo Renta', group: 'Tipo Renta' },
        { nombre: 'tipoRenta.delete', label: 'Borrar Tipo Renta', group: 'Tipo Renta' },
        { nombre: 'tipoRenta.change', label: 'Editar Tipo Renta', group: 'Tipo Renta' },
        // User
        { nombre: 'user.add', label: 'Crear User', group: 'User' },
        { nombre: 'user.history', label: 'Historial User', group: 'User' },
        { nombre: 'user.delete', label: 'Borrar User', group: 'User' },
        { nombre: 'user.change', label: 'Editar User', group: 'User' }, 
        // Feriado
        { nombre: 'feriado.add', label: 'Crear Feriado', group: 'Feriado' },
        { nombre: 'feriado.history', label: 'Historial Feriado', group: 'Feriado' },
        { nombre: 'feriado.delete', label: 'Borrar Tipo Feriado', group: 'Feriado' },
        // Tipo Entidad
        { nombre: 'tipo_entidad.add', label: 'Crear Tipo de Entidad', group: 'Tipo de Entidad' },
        { nombre: 'tipo_entidad.history', label: 'Historial Tipo de Entidad', group: 'Tipo de Entidad' },
        { nombre: 'tipo_entidad.delete', label: 'Borrar Tipo de Entidad', group: 'Tipo de Entidad' },
        { nombre: 'tipo_entidad.change', label: 'Editar Tipo de Entidad', group: 'Tipo de Entidad' },
        // Iva Entidad
        { nombre: 'iva_entidad.add', label: 'Crear Iva de Entidad', group: 'Iva Entidad' },
        { nombre: 'iva_entidad.history', label: 'Historial Iva de Entidad', group: 'Tipo Entidad' },
        { nombre: 'iva_entidad.delete', label: 'Borrar Iva de Entidad', group: 'Tipo Entidad' },
        { nombre: 'iva_entidad.change', label: 'Editar Iva de Entidad', group: 'Tipo Entidad' },
        // Cierre Ejercicio Entidad
        { nombre: 'cierre_ejercicio_entidad.add', label: 'Crear Cierre de Ejercicio', group: 'Cierre Ejercicio' },
        { nombre: 'cierre_ejercicio_entidad.history', label: 'Historial Cierre de Ejercicio', group: 'Cierre Ejercicio' },
        { nombre: 'cierre_ejercicio_entidad.delete', label: 'Borrar Cierre de Ejercicio', group: 'Cierre Ejercicio' },
        { nombre: 'cierre_ejercicio_entidad.change', label: 'Editar Cierre de Ejercicio', group: 'Cierre Ejercicio' },
        // Entidad
        { nombre: 'entidad.add', label: 'Crear Entidad', group: 'Entidad' },
        { nombre: 'entidad.history', label: 'Historial Entidad', group: 'Entidad' },
        { nombre: 'entidad.delete', label: 'Borrar Entidad', group: 'Entidad' },
        { nombre: 'entidad.change', label: 'Editar Entidad', group: 'Entidad' },
        // Entidad Controlada
        { nombre: 'entidad.controlada.add', label: 'Asignar Entidad Controlada', group: 'Entidad' },
        { nombre: 'entidad.controlada.history', label: 'Historial Entidad Controlada', group: 'Entidad' },
        { nombre: 'entidad.controlada.delete', label: 'Desasignar Entidad Controlada', group: 'Entidad' },
        // Comunicacion Entidad
        { nombre: 'comunicacion_entidad.add', label: 'Crear Comunicacion Entidad', group: 'Comunicacion Entidad' },
        { nombre: 'comunicacion_entidad.history', label: 'Historial Comunicacion Entidad', group: 'Comunicacion Entidad' },
        { nombre: 'comunicacion_entidad.delete', label: 'Borrar Comunicacion Entidad', group: 'Comunicacion Entidad' },
        { nombre: 'comunicacion_entidad.change', label: 'Editar Comunicacion Entidad', group: 'Comunicacion Entidad' },
        // Calificacion Fondo
        { nombre: 'entidad.calificacion_fondo.add', label: 'Crear Calificacion Fondo', group: 'Calificacion Fondo' },
        { nombre: 'entidad.calificacion_fondo.history', label: 'Historial Calificacion Fondo', group: 'Calificacion Fondo' },
        { nombre: 'entidad.calificacion_fondo.delete', label: 'Borrar Calificacion Fondo', group: 'Calificacion Fondo' },
        { nombre: 'entidad.calificacion_fondo.change', label: 'Editar Calificacion Fondo', group: 'Calificacion Fondo' },
        // Rol
        { nombre: 'rol.add', label: 'Crear Rol', group: 'Rol' },
        { nombre: 'rol.history', label: 'Historial Rol', group: 'Rol' },
        { nombre: 'rol.delete', label: 'Borrar Rol', group: 'Rol' },
        { nombre: 'rol.change', label: 'Editar Rol', group: 'Rol' },
        // Clase Activo
        { nombre: 'clase_activo.add', label: 'Crear Clase Activo', group: 'Clase Activo' },
        { nombre: 'clase_activo.history', label: 'Historial Clase Activo', group: 'Clase Activo' },
        { nombre: 'clase_activo.delete', label: 'Borrar Clase Activo', group: 'Clase Activo' },
        { nombre: 'clase_activo.change', label: 'Editar Clase Activo', group: 'Clase Activo' },
        // Subclase Activo
        { nombre: 'subclase_activo.add', label: 'Crear SubClase Activo', group: 'SubClase Activo' },
        { nombre: 'subclase_activo.history', label: 'Historial SubClase Activo', group: 'SubClase Activo' },
        { nombre: 'subclase_activo.delete', label: 'Borrar SubClase Activo', group: 'SubClase Activo' },
        { nombre: 'subclase_activo.change', label: 'Editar SubClase Activo', group: 'SubClase Activo' },
        // Clase Activo CNV
        { nombre: 'clase_activo_cnv.add', label: 'Crear Clase Activo CNV', group: 'Clase Activo CNV' },
        { nombre: 'clase_activo_cnv.history', label: 'Historial Clase Activo CNV', group: 'Clase Activo CNV' },
        { nombre: 'clase_activo_cnv.delete', label: 'Borrar Clase Activo CNV', group: 'Clase Activo CNV' },
        { nombre: 'clase_activo_cnv.change', label: 'Editar Clase Activo CNV', group: 'Clase Activo CNV' },
        // Subclase Activo CNV
        { nombre: 'subclase_activo_cnv.add', label: 'Crear SubClase Activo CNV', group: 'Clase SubActivo CNV' },
        { nombre: 'subclase_activo_cnv.history', label: 'Historial SubClase Activo CNV', group: 'SubClase Activo CNV' },
        { nombre: 'subclase_activo_cnv.delete', label: 'Borrar Clase SubActivo CNV', group: 'SubClase Activo CNV' },
        { nombre: 'subclase_activo_cnv.change', label: 'Editar Clase SubActivo CNV', group: 'SubClase Activo CNV' },
        // Activo
        { nombre: 'activo.add', label: 'Crear Activo', group: 'Activo' },
        { nombre: 'activo.history', label: 'Historial Activo', group: ' Activo' },
        { nombre: 'activo.delete', label: 'Borrar Activo', group: 'Activo' },
        { nombre: 'activo.change', label: 'Editar Activo', group: 'Activo' },
        // Ticker Activo
        { nombre: 'ticker_activo.add', label: 'Crear Ticker Activo', group: 'Ticker Activo' },
        { nombre: 'ticker_activo.history', label: 'Historial Ticker Activo', group: ' Ticker Activo' },
        { nombre: 'ticker_activo.delete', label: 'Borrar Clase Ticker Activo', group: 'Ticker Activo' },
        { nombre: 'ticker_activo.change', label: 'Editar Clase Ticker Activo', group: 'Ticker Activo' },
        // Tasa Activo
        { nombre: 'tasa_activo.add', label: 'Crear Tasa Activo', group: 'Tasa Activo' },
        { nombre: 'tasa_activo.history', label: 'Historial Tasa Activo', group: ' Tasa Activo' },
        { nombre: 'tasa_activo.delete', label: 'Borrar Clase Tasa Activo', group: 'Tasa Activo' },
        { nombre: 'tasa_activo.change', label: 'Editar Clase Tasa Activo', group: 'Tasa Activo' },
        // Tipo Renta Mixta
        { nombre: 'tipoRentaMixta.add', label: 'Crear Tipo de Renta mixta', group: 'Tipo de Renta mixta' },
        { nombre: 'tipoRentaMixta.history', label: 'Historial Tipo de Renta mixta', group: 'Tipo de Renta mixta' },
        { nombre: 'tipoRentaMixta.delete', label: 'Borrar Tipo de Renta mixta', group: 'Tipo de Renta mixta' },
        { nombre: 'tipoRentaMixta.change', label: 'Editar Tipo de Renta mixta', group: 'Tipo de Renta mixta' },
        // Tipo Ticker
        { nombre: 'tipoTicker.add', label: 'Crear Tipo de Ticker', group: 'Tipo de Ticker' },
        { nombre: 'tipoTicker.history', label: 'Historial Tipo de Ticker', group: 'Tipo de Ticker' },
        { nombre: 'tipoTicker.delete', label: 'Borrar Tipo de Ticker', group: 'Tipo de Ticker' },
        { nombre: 'tipoTicker.change', label: 'Editar Tipo de Ticker', group: 'Tipo de Ticker' },
        // Actividad
        { nombre: 'actividad.add', label: 'Crear Actividad', group: 'Actividad' },
        { nombre: 'actividad.history', label: 'Historial Actividad', group: 'Actividad' },
        { nombre: 'actividad.delete', label: 'Borrar Actividad', group: 'Actividad' },
        { nombre: 'actividad.change', label: 'Editar Actividad', group: 'Actividad' },
        // Clasificacion
        { nombre: 'clasificacion.add', label: 'Crear Clasificacion', group: 'Clasificacion' },
        { nombre: 'clasificacion.history', label: 'Historial Clasificacion', group: 'Clasificacion' },
        { nombre: 'clasificacion.delete', label: 'Borrar Clasificacion', group: 'Clasificacion' },
        { nombre: 'clasificacion.change', label: 'Editar Clasificacion', group: 'Clasificacion' },
        // Clase Fondo
        { nombre: 'clase_fondo.add', label: 'Crear Clase de Fondo', group: 'Clase de Fondo' },
        { nombre: 'clase_fondo.history', label: 'Historial Clase de Fondo', group: 'Clase de Fondo' },
        { nombre: 'clase_fondo.delete', label: 'Borrar Clase de Fondo', group: 'Clase de Fondo' },
        { nombre: 'clase_fondo.change', label: 'Editar Clase de Fondo', group: 'Clase de Fondo' },
        // Tipo Clase Fondo
        { nombre: 'tipo_clase_fondo.add', label: 'Crear Tipo de Clase de Fondo', group: 'Tipo de Clase de Fondo' },
        { nombre: 'tipo_clase_fondo.history', label: 'Historial Tipo de Clase de Fondo', group: 'Tipo de Clase de Fondo' },
        { nombre: 'tipo_clase_fondo.delete', label: 'Borrar Tipo de Clase de Fondo', group: 'Tipo de Clase de Fondo' },
        { nombre: 'tipo_clase_fondo.change', label: 'Editar Tipo de Clase de Fondo', group: 'Tipo de Clase de Fondo' },
        // Tipo Fondo
        { nombre: 'tipo_fondo.add', label: 'Crear Tipo de Fondo', group: 'Tipo de Fondo' },
        { nombre: 'tipo_fondo.history', label: 'Historial Tipo de Fondo', group: 'Tipo de Fondo' },
        { nombre: 'tipo_fondo.delete', label: 'Borrar Tipo de Fondo', group: 'Tipo de Fondo' },
        { nombre: 'tipo_fondo.change', label: 'Editar Tipo de Fondo', group: 'Tipo de Fondo' },
        // Fondo
        { nombre: 'fondo.add', label: 'Crear Fondo', group: 'Fondo' },
        { nombre: 'fondo.history', label: 'Historial Fondo', group: 'Fondo' },
        { nombre: 'fondo.delete', label: 'Borrar Fondo', group: 'Fondo' },
        { nombre: 'fondo.change', label: 'Editar Fondo', group: 'Fondo' },
        // Dolar Transferencia Implicito
        { nombre: 'dolar_transferencia_implicito.add', label: 'Crear Dolar Transferencia Implicito', group: 'Dolar Transferencia Implicito' },
        { nombre: 'dolar_transferencia_implicito.history', label: 'Historial Dolar Transferencia Implicito', group: 'Dolar Transferencia Implicito' },
        { nombre: 'dolar_transferencia_implicito.delete', label: 'Borrar Dolar Transferencia Implicito', group: 'Dolar Transferencia Implicito' },
        { nombre: 'dolar_transferencia_implicito.change', label: 'Editar Dolar Transferencia Implicito', group: 'Dolar Transferencia Implicito' },
        { nombre: 'dolar_transferencia_implicito.reportes', label: 'Reporte Dolar Transferencia Implicito', group: 'Dolar Transferencia Implicito' },
        // Horizonte
        { nombre: 'horizonte.add', label: 'Crear Horizonte', group: 'Horizonte' },
        { nombre: 'horizonte.history', label: 'Historial Horizonte', group: 'Horizonte' },
        { nombre: 'horizonte.delete', label: 'Borrar Horizonte', group: 'Horizonte' },
        { nombre: 'horizonte.change', label: 'Editar Horizonte', group: 'Horizonte' },
        // Composicion Benchmark
        { nombre: 'composicionBenchmark.add', label: 'Crear Composicion Benchmark', group: 'Composicion Benchmark' },
        { nombre: 'composicionBenchmark.history', label: 'Historial Crear Composicion', group: 'Composicion Benchmark' },
        { nombre: 'composicionBenchmark.delete', label: 'Borrar Crear Composicion', group: 'Composicion Benchmark' },
        { nombre: 'composicionBenchmark.change', label: 'Editar Crear Composicion', group: 'Composicion Benchmark' },
        // Item Composicion Benchmark
        { nombre: 'itemComposicionBenchmark.add', label: 'Crear Item Composicion Benchmark', group: 'Item Composicion Benchmark' },
        { nombre: 'itemComposicionBenchmark.history', label: 'Historial Item Crear Composicion', group: 'Item Composicion Benchmark' },
        { nombre: 'itemComposicionBenchmark.delete', label: 'Borrar Item Composicion', group: 'Item Composicion Benchmark' },
        { nombre: 'itemComposicionBenchmark.change', label: 'Editar Item Composicion', group: 'Item Composicion Benchmark' },
        // Alias Moneda
        { nombre: 'aliasMoneda.list', label: 'Lista Alias Moneda', group: 'Alias Moneda' },
        { nombre: 'aliasMoneda.add', label: 'Crear Alias Moneda', group: 'Alias Moneda' },
        { nombre: 'aliasMoneda.history', label: 'Historial Alias Moneda', group: 'Alias Moneda' },
        { nombre: 'aliasMoneda.delete', label: 'Borrar Alias Moneda', group: 'Alias Moneda' },
        { nombre: 'aliasMoneda.change', label: 'Editar Alias Moneda', group: 'Alias Moneda' },
        // alias Mercado
        { nombre: 'aliasMercado.list', label: 'Lista Alias Mercado', group: 'Alias Mercado' },
        { nombre: 'aliasMercado.add', label: 'Crear Alias Mercado', group: 'Alias Mercado' },
        { nombre: 'aliasMercado.history', label: 'Historial Alias Mercado', group: 'Alias Mercado' },
        { nombre: 'aliasMercado.delete', label: 'Borrar Alias Mercado', group: 'Alias Mercado' },
        { nombre: 'aliasMercado.change', label: 'Editar Alias Mercado', group: 'Alias Mercado' },
        // alias pais
        { nombre: 'aliasPais.list', label: 'Lista Alias Pais', group: 'Alias Pais' },
        { nombre: 'aliasPais.add', label: 'Crear Alias Pais', group: 'Alias Pais' },
        { nombre: 'aliasPais.history', label: 'Historial Alias Pais', group: 'Alias Pais' },
        { nombre: 'aliasPais.delete', label: 'Borrar Alias Pais', group: 'Alias Pais' },
        { nombre: 'aliasPais.change', label: 'Editar Alias Pais', group: 'Alias Pais' },
        // alias calificadora
        { nombre: 'aliasCalificadora.list', label: 'Lista Alias Calificadora', group: 'Alias Calificadora' },
        { nombre: 'aliasCalificadora.add', label: 'Crear Alias Calificadora', group: 'Alias Calificadora' },
        { nombre: 'aliasCalificadora.history', label: 'Historial Alias Calificadora', group: 'Alias Calificadora' },
        { nombre: 'aliasCalificadora.delete', label: 'Borrar Alias Calificadora', group: 'Alias Calificadora' },
        { nombre: 'aliasCalificadora.change', label: 'Editar Alias Calificadora', group: 'Alias Calificadora' },
        // alias Activo
        { nombre: 'aliasActivo.list', label: 'Lista Alias Activo', group: 'Alias Activo' },
        { nombre: 'aliasActivo.add', label: 'Crear Alias Activo', group: 'Alias Activo' },
        { nombre: 'aliasActivo.history', label: 'Historial Alias Activo', group: 'Alias Activo' },
        { nombre: 'aliasActivo.delete', label: 'Borrar Alias Activo', group: 'Alias Activo' },
        { nombre: 'aliasActivo.change', label: 'Editar Alias Activo', group: 'Alias Activo' },
        { nombre: 'aliasActivo.allAlias', label: 'Ver todos los Alias Activo', group: 'Alias Activo' },
        // interfaz diaria
        { nombre: 'interfazDiaria.completar', label: 'Interfaz Diaria Completar', group: 'Interfaz Diaria' },
        { nombre: 'interfazDiaria.guardar', label: 'Interfaz Diaria Guardar', group: 'Interfaz Diaria' },
        { nombre: 'interfazDiaria.agen', label: 'Interfaz Diaria AGEN', group: 'Interfaz Diaria' },
        { nombre: 'interfazDiaria.reportesDiarios', label: 'Interfaz Diaria Reportes Diarios', group: 'Interfaz Diaria' },
        // interfaz semanal
        { nombre: 'interfazSemanal.completar', label: 'Interfaz Semanal Completar', group: 'Interfaz Semanal' },
        { nombre: 'interfazSemanal.guardar', label: 'Interfaz Semanal Guardar', group: 'Interfaz Semanal' },
        { nombre: 'interfazSemanal.limites', label: 'Interfaz Semanal Limites', group: 'Interfaz Semanal' },
        { nombre: 'interfazSemanal.reportes', label: 'Interfaz Semanal Reportes', group: 'Interfaz Semanal' },
        // interfaz mensual
        { nombre: 'interfazMensual.completar', label: 'Interfaz Mensual Completar', group: 'Interfaz Mensual' },
        { nombre: 'interfazMensual.guardar', label: 'Interfaz Mensual Guardar', group: 'Interfaz Mensual' },
        { nombre: 'interfazMensual.limites', label: 'Interfaz Mensual Limites', group: 'Interfaz Mensual' },
        { nombre: 'interfazMensual.reportes', label: 'Interfaz Mensual Reportes', group: 'Interfaz Mensual' },  
        // interfaz
        { nombre: 'interfaz.cierre', label: 'Generar Cierre', group: 'Interfaz' },
        { nombre: 'interfaz.descargarCierre', label: 'Descargar Cierre', group: 'Interfaz' },
        // balance entidad
        { nombre: 'balanceEntidad.add', label: 'Crear Balance Entidad', group: 'Balance Entidad' },
        { nombre: 'balanceEntidad.history', label: 'Historial Balance Entidad', group: 'Balance Entidad' },        
        // cotizacion Mae
        { nombre: 'cotizacionMae.list', label: 'Lista Cotizacion Mae', group: 'Cotizacion Mae' },
        { nombre: 'cotizacionMae.add', label: 'Crear Cotizacion Mae', group: 'Cotizacion Mae' },
        { nombre: 'cotizacionMae.get', label: 'Obtener Cotizacion Mae', group: 'Cotizacion Mae' },
        { nombre: 'cotizacionMae.parse', label: 'Parsear Cotizacion Mae', group: 'Cotizacion Mae' },
        { nombre: 'cotizacionMae.getTxt', label: 'Obtener Reporte Mae TXT', group: 'Cotizacion Mae' },
        { nombre: 'cotizacionMae.getXlsx', label: 'Obtener Reporte Mae XLSX', group: 'Cotizacion Mae' },
        // Filtro reporte
        { nombre: 'filtro_reporte.subfiltro', label: 'Obtener Subfiltros Reporte', group: 'Filtro Reporte' },
        { nombre: 'filtro_reporte.obtenerReportes', label: 'Obtener Reportes para Filtro', group: 'Filtro Reporte' },       
        // Filtro informe
        { nombre: 'filtro_informe.folders', label: 'Obtener Folders Informe', group: 'Filtro Informe' },
        { nombre: 'filtro_informe.obtenerInformes', label: 'Obtener Informes para Filtro', group: 'Filtro Informe' },       
      ]
    });
  });
  // How to add a route: put the controller name here and add it in index.js and in the named resource
  app.get('/', checkPermission('hello'), function(req, res){ res.send({ success: true, data: "Hello world" }); });

  /**
   * @apiDefine HeaderAuthorization
   * @apiHeader {String} Authorization Bearer [token]
   */

  /**
   * @apiDefine ListSuccess
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data Listado de todos los modelos para la pagina.
   * @apiSuccess {Integer} page Numero de pagina.
   * @apiSuccess {Integer} lastPage Numero de la ultima pagina.
   */

  /**
   * @apiDefine AddSuccess
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Modelo creado.
   */

  /**
   * @apiDefine ChangeSuccess
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Modelo modificado.
   */

  /**
   * @apiDefine HistorySuccess
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data Listado de todos los estados para los modelos.
   * @apiSuccess {Integer} page Numero de pagina.
   * @apiSuccess {Integer} lastPage Numero de la ultima pagina.
   */

  /**
   * @apiDefine DeleteSuccess
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */

  /**
   * @apiDefine GetSuccess
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Modelo.
   */

  /**
   * @apiDefine QueryModelId
   * @apiParam (QueryString) {Integer} id ID del modelo a buscar
   */

  /**
   * @apiDefine ChangeUpdatedAt
   * @apiParam {Date} updatedAt Fecha de la ultima actualizacion del modelo.
   */

  /**
   * @apiDefine EntidadQueryString
   * @apiParam (QueryString) {Integer} parent_id ID de la entidad madre
   */ 

  //////////////////

  //ABM Alias Moneda
  /**
   * @api {get} /moneda/alias ABM Listado
   * @apiName List
   * @apiGroup Alias Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMoneda.list
   *
   * @apiUse ListSuccess
   */
  app.get('/moneda/alias', checkPermission('aliasMoneda.list'), route.aliasMoneda.list);
  
  /**
   * @api {post} /moneda/alias ABM Crear
   * @apiName Add
   * @apiGroup Alias Moneda
   * @apiVersion 0.1.0
   * @apiDescription Toma la entidadId de la entidad asociada al usuario
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMoneda.add
   *
   * @apiParam {Integer} monedaId Id de la moneda
   * @apiParam {String} aliasInterno alias
   *
   * @apiUse AddSuccess
   */
  app.post('/moneda/alias', checkPermission('aliasMoneda.add'), route.aliasMoneda.add);
  
  /**
   * @api {get} /moneda/alias/history ABM Listado Historico
   * @apiName History
   * @apiGroup Alias Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMoneda.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/moneda/alias/history', checkPermission('aliasMoneda.history'), route.aliasMoneda.log);
  
  /**
   * @api {delete} /moneda/:id/alias ABM Borrar
   * @apiName Delete
   * @apiGroup Alias Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMoneda.delete
   *
   * @apiParam (QueryString) {Integer} id ID de la moneda
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/moneda/:id/alias', checkPermission('aliasMoneda.delete'), route.aliasMoneda.delete);
  
  /**
   * @api {put} /moneda/:id/alias ABM Cambio
   * @apiName Change
   * @apiGroup Alias Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMoneda.change
   *
   * @apiParam (QueryString) {Integer} id ID de la moneda
   * @apiParam {String} aliasInterno alias
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/moneda/:id/alias', checkPermission('aliasMoneda.change'), route.aliasMoneda.change);

  //////////////////

  // ABM Monedas
  /**
   * @apiDefine MonedaParams
   * @apiParam {String} nombre Nombre de la Moneda
   * @apiParam {String} codigoCafci Codigo CAFCI de la Moneda
   * @apiParam {String} [idCNV] ID que le da la CNV
   */

  /**
   * @api {get} /moneda ABM Listado
   * @apiName List
   * @apiGroup Moneda
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/moneda', route.moneda.list);
  
  /**
   * @api {post} /moneda ABM Crear
   * @apiName Add
   * @apiGroup Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission moneda.add
   *
   * @apiUse MonedaParams
   *
   * @apiUse AddSuccess
   */
  app.post('/moneda', checkPermission('moneda.add'), route.moneda.add);

  /**
   * @api {get} /moneda/history ABM Listado Historico
   * @apiName History
   * @apiGroup Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission moneda.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/moneda/history',  checkPermission('moneda.history'), route.moneda.log);

  /**
   * @api {get} /moneda/:id ABM Obtener
   * @apiName Get
   * @apiGroup Moneda
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/moneda/:id', route.moneda.get);

  /**
   * @api {delete} /moneda/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission moneda.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/moneda/:id', checkPermission('moneda.delete'), route.moneda.delete);

  /**
   * @api {put} /moneda/:id ABM Cambio
   * @apiName Change
   * @apiGroup Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission moneda.change
   *
   * @apiUse QueryModelId
   * @apiUse MonedaParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/moneda/:id', checkPermission('moneda.change'), route.moneda.change);

  /////////////////////////////////

  /**
   * @apiDefine CotizacionMonedaParams
   * @apiParam {Integer} monedaLocalId Id de la Moneda local
   * @apiParam {Integer} monedaExteriorId Id de la Moneda exterior. Debe ser distinta de monedaLocalId
   * @apiParam {Integer} cantidadMoneda Cantidad de la moneda
   * @apiParam {String{1..10}} cotizacionCompra Cotizacion para la compra (6 enteros, 4 decimales)
   * @apiParam {String{1..10}} cotizacionVenta Cotizacion para la venta (6 enteros, 4 decimales)
   */

  // ABM Cotizacion Moneda
  /**
   * @api {get} /cotizacion-moneda ABM Listado
   * @apiName List
   * @apiGroup Cotizacion Moneda
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/cotizacion-moneda', route.cotizacionMoneda.list);
  
  /**
   * @api {post} /cotizacion-moneda ABM Crear
   * @apiName Add
   * @apiGroup Cotizacion Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMoneda.add
   *
   * @apiUse CotizacionMonedaParams
   *
   * @apiUse AddSuccess
   */
  app.post('/cotizacion-moneda', checkPermission('cotizacionMoneda.add'), route.cotizacionMoneda.add);

  /**
   * @api {get} /cotizacion-moneda/history ABM Listado Historico
   * @apiName History
   * @apiGroup Cotizacion Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMoneda.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/cotizacion-moneda/history', checkPermission('cotizacionMoneda.history'), route.cotizacionMoneda.log);

  /**
   * @api {get} /cotizacion-moneda/:id ABM Obtener
   * @apiName Get
   * @apiGroup Cotizacion Moneda
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/cotizacion-moneda/:id', route.cotizacionMoneda.get);

  /**
   * @api {delete} /cotizacion-moneda/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Cotizacion Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMoneda.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/cotizacion-moneda/:id', checkPermission('cotizacionMoneda.delete'), route.cotizacionMoneda.delete);

  /**
   * @api {put} /cotizacion-moneda/:id ABM Cambio
   * @apiName Change
   * @apiGroup Cotizacion Moneda
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMoneda.change
   *
   * @apiUse QueryModelId
   * @apiUse CotizacionMonedaParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/cotizacion-moneda/:id',checkPermission('cotizacionMoneda.change'), route.cotizacionMoneda.change);

  /////////////////////////////////

  //ABM Alias Pais
  /**
   * @api {get} /pais/alias ABM Listado
   * @apiName List
   * @apiGroup Alias Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasPais.list
   *
   * @apiUse ListSuccess
   */
  app.get('/pais/alias',checkPermission('aliasPais.list'), route.aliasPais.list);
  
  /**
   * @api {post} /pais/alias ABM Crear
   * @apiName Add
   * @apiGroup Alias Pais
   * @apiVersion 0.1.0
   * @apiDescription Toma la entidadId de la entidad asociada al usuario
   * @apiUse HeaderAuthorization
   * @apiPermission aliasPais.add
   *
   * @apiParam {String} paisId Id del pais
   * @apiParam {String} aliasInterno alias
   *
   * @apiUse AddSuccess
   */
  app.post('/pais/alias', checkPermission('aliasPais.add'), route.aliasPais.add);
  
  /**
   * @api {get} /pais/alias ABM Listado Historico
   * @apiName History
   * @apiGroup Alias Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasPais.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/pais/alias/history', checkPermission('aliasPais.history'), route.aliasPais.log);
  
  /**
   * @api {delete} /pais/:id/alias ABM Borrar
   * @apiName Delete
   * @apiGroup Alias Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasPais.delete
   *
   * @apiParam (QueryString) {Integer} id ID del pais
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/pais/:id/alias', checkPermission('aliasPais.delete'), route.aliasPais.delete);
  
  /**
   * @api {put} /pais/:id/alias ABM Cambio
   * @apiName Change
   * @apiGroup Alias Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasPais.change
   *
   * @apiParam (QueryString) {Integer} id ID del pais
   * @apiParam {String} aliasInterno alias
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/pais/:id/alias', checkPermission('aliasPais.change'), route.aliasPais.change);

  /////////////////////////////////

  // ABM Pais
  /**
   * @apiDefine PaisParams
   * @apiParam {String} nombre Nombre del Pais
   * @apiParam {String} codigoCafci Codigo CAFCI del Pais
   */

  /**
   * @api {get} /pais ABM Listado
   * @apiName List
   * @apiGroup Pais
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/pais', route.pais.list);

  /**
   * @api {post} /pais ABM Crear
   * @apiName Add
   * @apiGroup Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission pais.add
   *
   * @apiUse PaisParams
   *
   * @apiUse AddSuccess
   */
  app.post('/pais', checkPermission('pais.add') , route.pais.add);

  /**
   * @api {get} /pais/history ABM Listado Historico
   * @apiName History
   * @apiGroup Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission pais.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/pais/history', checkPermission('pais.history'), route.pais.log);

  /**
   * @api {get} /pais/:id ABM Obtener
   * @apiName Get
   * @apiGroup Pais
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/pais/:id', route.pais.get);

  /**
   * @api {delete} /pais/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission pais.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/pais/:id', checkPermission('pais.delete'), route.pais.delete);

  /**
   * @api {put} /pais/:id ABM Cambio
   * @apiName Change
   * @apiGroup Pais
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission pais.change
   *
   * @apiUse QueryModelId
   * @apiUse PaisParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/pais/:id', checkPermission('pais.change'), route.pais.change);

  ///////////////

  //ABM Alias Mercado
  /**
   * @api {get} /mercado/alias ABM Listado
   * @apiName List
   * @apiGroup Alias Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMercado.list
   *
   * @apiUse ListSuccess
   */
  app.get('/mercado/alias', checkPermission('aliasMercado.list'), route.aliasMercado.list);
  
  /**
   * @api {post} /mercado/alias ABM Crear
   * @apiName Add
   * @apiGroup Alias Mercado
   * @apiVersion 0.1.0
   * @apiDescription Toma la entidadId de la entidad asociada al usuario
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMercado.add
   *
   * @apiParam {Integer} mercadoId Id del mercado
   * @apiParam {String} aliasInterno alias
   *
   * @apiUse AddSuccess
   */
  app.post('/mercado/alias', checkPermission('aliasMercado.add'), route.aliasMercado.add);
  
  /**
   * @api {get} /mercado/alias/history ABM Listado Historico
   * @apiName History
   * @apiGroup Alias Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMercado.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/mercado/alias/history', checkPermission('aliasMercado.history'), route.aliasMercado.log);
  
  /**
   * @api {delete} /mercado/:id/alias ABM Borrar
   * @apiName Delete
   * @apiGroup Alias Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMercado.delete
   *
   * @apiParam (QueryString) {Integer} id ID del mercado
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/mercado/:id/alias', checkPermission('aliasMercado.delete'), route.aliasMercado.delete);
  
  /**
   * @api {put} /mercado/:id/alias ABM Cambio
   * @apiName Change
   * @apiGroup Alias Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasMercado.change
   *
   * @apiParam (QueryString) {Integer} id ID del mercado
   * @apiParam {String} aliasInterno alias
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/mercado/:id/alias', checkPermission('aliasMercado.change'), route.aliasMercado.change);

  ///////////////
  
  //ABM Mercado
  /**
   * @apiDefine MercadoParams
   * @apiParam {String} nombre Nombre del Mercado
   * @apiParam {String} codigoCafci Codigo CAFCI del Mercado
   * @apiParam {Integer} [paisId] ID del pais del mercado
   */  

  /**
   * @api {get} /mercado ABM Listado
   * @apiName List
   * @apiGroup Mercado
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/mercado', route.mercado.list);

  /**
   * @api {post} /mercado ABM Crear
   * @apiName Add
   * @apiGroup Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission mercado.add
   *
   * @apiUse MercadoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/mercado', checkPermission('mercado.add'), route.mercado.add);

  /**
   * @api {get} /mercado/history ABM Listado Historico
   * @apiName History
   * @apiGroup Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission mercado.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/mercado/history', checkPermission('mercado.history'), route.mercado.log);

  /**
   * @api {get} /mercado/:id ABM Obtener
   * @apiName Get
   * @apiGroup Mercado
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/mercado/:id', route.mercado.get);

  /**
   * @api {delete} /mercado/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission mercado.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/mercado/:id', checkPermission('mercado.delete'), route.mercado.delete);

  /**
   * @api {put} /mercado/:id ABM Cambio
   * @apiName Change
   * @apiGroup Mercado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission mercado.change
   *
   * @apiUse QueryModelId
   * @apiUse MercadoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/mercado/:id', checkPermission('mercado.change'), route.mercado.change);
  
  ////////////////////////////  

  //ABM Benchmark
  /**
   * @apiDefine BenchmarkParams
   * @apiParam {String} nombre Nombre de la Moneda
   * @apiParam {String} codigoCafci Codigo CAFCI de la Moneda
   * @apiParam {String{3}} orden Campo de Orden
   */

  /**
   * @api {get} /benchmark ABM Listado
   * @apiName List
   * @apiGroup Benchmark
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/benchmark', route.benchmark.list);
  
  /**
   * @api {post} /benchmark ABM Crear
   * @apiName Add
   * @apiGroup Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission benchmark.add
   *
   * @apiUse BenchmarkParams
   *
   * @apiUse AddSuccess
   */
  app.post('/benchmark', checkPermission('benchmark.add'), route.benchmark.add);

  /**
   * @api {get} /benchmark/history ABM Listado Historico
   * @apiName History
   * @apiGroup Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission benchmark.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/benchmark/history', checkPermission('benchmark.history'),route.benchmark.log);

  /**
   * @api {get} /benchmark/:id ABM Obtener
   * @apiName Get
   * @apiGroup Benchmark
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/benchmark/:id', route.benchmark.get);
  
  /**
   * @api {delete} /benchmark/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission benchmark.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/benchmark/:id', checkPermission('benchmark.delete'), route.benchmark.delete);
  
  /**
   * @api {put} /benchmark/:id ABM Cambio
   * @apiName Change
   * @apiGroup Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission benchmark.change
   *
   * @apiUse QueryModelId
   * @apiUse BenchmarkParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/benchmark/:id', checkPermission('benchmark.change'), route.benchmark.change);
  
  ////////////////////////////
  //ABM Duration
  /**
   * @apiDefine DurationParams
   * @apiParam {String} nombre Nombre de la Duration
   * @apiParam {String} codigoCafci Codigo CAFCI de la Duration
   * @apiParam {String{3}} orden Campo de Orden
   */

  /**
   * @api {get} /duration ABM Listado
   * @apiName List
   * @apiGroup Duration
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/duration', route.duration.list);
  
  /**
   * @api {post} /duration ABM Crear
   * @apiName Add
   * @apiGroup Duration
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission duration.add
   *
   * @apiUse DurationParams
   *
   * @apiUse AddSuccess
   */
  app.post('/duration', checkPermission('duration.add'), route.duration.add);

  /**
   * @api {get} /duration/history ABM Listado Historico
   * @apiName History
   * @apiGroup Duration
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission duration.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/duration/history', checkPermission('duration.history'),route.duration.log);
  
  /**
   * @api {get} /duration/:id ABM Obtener
   * @apiName Get
   * @apiGroup Duration
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/duration/:id', route.duration.get);
  
  /**
   * @api {delete} /duration/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Duration
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission duration.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/duration/:id', checkPermission('duration.delete'), route.duration.delete);
  
  /**
   * @api {put} /duration/:id ABM Cambio
   * @apiName Change
   * @apiGroup Duration
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission duration.change
   *
   * @apiUse QueryModelId
   * @apiUse DurationParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/duration/:id', checkPermission('duration.change'), route.duration.change);
  
  ////////////////////////////

  //ABM Region
  /**
   * @apiDefine RegionParams
   * @apiParam {String} nombre Nombre de la Region
   * @apiParam {String} codigoCafci Codigo CAFCI de la Region
   * @apiParam {String{3}} orden Campo de Orden
   */

  /**
   * @api {get} /region ABM Listado
   * @apiName List
   * @apiGroup Region
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/region', route.region.list);
  
  /**
   * @api {post} /region ABM Crear
   * @apiName Add
   * @apiGroup Region
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission region.add
   *
   * @apiUse RegionParams
   *
   * @apiUse AddSuccess
   */
  app.post('/region', checkPermission('region.add'), route.region.add);

  /**
   * @api {get} /duration/history ABM Listado Historico
   * @apiName History
   * @apiGroup Region
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission region.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/region/history', checkPermission('region.history'),route.region.log);

  /**
   * @api {get} /region/:id ABM Obtener
   * @apiName Get
   * @apiGroup Region
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/region/:id', route.region.get);
  
  /**
   * @api {delete} /region/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Region
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission region.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/region/:id', checkPermission('region.delete'), route.region.delete);
  
  /**
   * @api {put} /region/:id ABM Cambio
   * @apiName Change
   * @apiGroup Region
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission region.change
   *
   * @apiUse QueryModelId
   * @apiUse RegionParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/region/:id', checkPermission('region.change'), route.region.change);
  
////////////////////////////
  //ABM Tipo de renta
  /**
   * @apiDefine TipoRentaParams
   * @apiParam {String} nombre Nombre del Tipo de Renta
   * @apiParam {String} codigoCafci Codigo CAFCI del Tipo de Renta
   * @apiParam {String{3}} orden Campo de Orden
   * @apiParam {String{1..8}} parametroPorcentual Parametro Porcentual (2 enteros, 6 decimales)
   */ 

  /**
   * @api {get} /tipo-renta ABM Listado
   * @apiName List
   * @apiGroup Tipo de renta
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/tipo-renta', route.tipoRenta.list);
  
  /**
   * @api {post} /tipo-renta ABM Crear
   * @apiName Add
   * @apiGroup Tipo de renta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRenta.add
   *
   * @apiUse TipoRentaParams
   *
   * @apiUse AddSuccess
   */
  app.post('/tipo-renta', checkPermission('tipoRenta.add'), route.tipoRenta.add);

  /**
   * @api {get} /tipo-renta/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tipo de renta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRenta.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/tipo-renta/history', checkPermission('tipoRenta.history'),route.tipoRenta.log);
  
  /**
   * @api {get} /tipo-renta/:id ABM Obtener
   * @apiName Get
   * @apiGroup Tipo de renta
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/tipo-renta/:id', route.tipoRenta.get);
  
  /**
   * @api {delete} /tipo-renta/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Tipo de renta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRenta.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/tipo-renta/:id', checkPermission('tipoRenta.delete'), route.tipoRenta.delete);
  
  /**
   * @api {put} /tipo-renta/:id ABM Cambio
   * @apiName Change
   * @apiGroup Tipo de renta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRenta.change
   *
   * @apiUse QueryModelId
   * @apiUse TipoRentaParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/tipo-renta/:id', checkPermission('tipoRenta.change'), route.tipoRenta.change);
  
////////////////////////////
  //ABM User
  /**
   * @apiDefine UserParams
   * @apiParam {String} modelName Nombre de usuario
   * @apiParam {String} pass Password del user
   * @apiParam {String} email e-mail del user (debe tener formato de e-mail)
   * @apiParam {String} surname Apellido del user
   * @apiParam {String} names Nombres del user
   * @apiParam {String} dni DNI del user
   * @apiParam {String='Expira a los 90 días','Expira a los 180 días','Expira a los 360 días'} passwordLife Tiempo de expiracion del password del user
   * @apiParam {int} [entidadId] Rol del user   
   * @apiParam {Date} [altaEntidadFecha] Fecha de alta de entidad
   * @apiParam {String='habilitado', 'bloqueado'} estado='habilitado' Estado del usuario
   * @apiParam {String} [publicKeyName] Nombre del archivo que contiene la public key.
   * @apiParam {Integer} rolId Rol del user
   */

  /**
   * @apiDefine UserChangeParams
   * @apiParam {String} email e-mail del user (debe tener formato de e-mail)
   * @apiParam {String} surname Apellido del user
   * @apiParam {String} names Nombres del user
   * @apiParam {String} dni DNI del user
   * @apiParam {String='Expira a los 90 días','Expira a los 180 días','Expira a los 360 días'} passwordLife Tiempo de expiracion del password del user
   * @apiParam {int} [entidadId] Rol del user   
   * @apiParam {Date} [altaEntidadFecha] Fecha de alta de entidad
   * @apiParam {String='habilitado', 'bloqueado'} estado='habilitado' Estado del usuario
   * @apiParam {String} [publicKeyName] Nombre del archivo que contiene la public key.
   * @apiParam {Integer} rolId Rol del user
   */

  /**
   * @api {get} /user ABM Listado
   * @apiName List
   * @apiGroup User
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/user', route.user.list);
  
  /**
   * @api {post} /user ABM Crear
   * @apiName Add
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission user.add
   *
   * @apiUse UserParams
   *
   * @apiUse AddSuccess
   */
  app.post('/user', checkPermission('user.add'), route.user.add);

  /**
   * @api {get} /user/history ABM Listado Historico
   * @apiName History
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission user.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/user/history', checkPermission('user.history'),route.user.log);

  /**
   * @api {get} /user/logout Desloguearse
   * @apiName Logout
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.get('/user/logout', passport.authenticate('bearer', { session: false }), route.user.logout);

  /**
   * @api {get} /user/login/info ABM Listado Logins
   * @apiName Login
   * @apiGroup User
   * @apiVersion 0.1.0
   *
   * @apiParam (QueryString) {String} [desde] Fecha de inicio para obtener resultados por rango ('DD/MM/YYYY')
   * @apiParam (QueryString) {String} [hasta] Fecha de fin para obtener resultados por rango ('DD/MM/YYYY')
   * @apiParam (QueryString) {int} [userId] Id del usuario para filtrar
   * @apiParam (QueryString) {int} [page]=0  Pagina para paginacion
   * @apiParam (QueryString) {int} [limit]=10 Limite para paginacion
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data Devuelve el listado de todos los intentos de login y cambios de contraseña por usuario.
   */
  app.get('/user/login/info', route.user.actionList);
  
  /**
   * @api {get} /user/changePassword Cambiar Contraseña
   * @apiName changePassword
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {String} modelName Nombre de usuario
   * @apiParam {String} pass Password vigente del user
   * @apiParam {String} newPass Nuevo password 
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.post('/user/changePassword', route.user.changePassword);

  /**
   * @api {get} /user ABM Permisos del usuario
   * @apiName Permisos
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data  Devuelve el listado de los permisos del usuario.
   */
  app.get('/user/permisos', passport.authenticate('bearer', { session: false }), route.user.permisos);

  /**
   * @api {get} /user/profile Profile
   * @apiName Profile
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Devuelve los datos del usuario, y de la entidad asociada (si la tiene).
   */
  app.get('/user/profile', passport.authenticate('bearer', { session: false }), route.user.profile);

  /**
   * @api {get} /user/:id/password/expire Expirar Contraseña
   * @apiName expirePassword
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   *
   * @apiUse QueryModelId
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.get('/user/:id/password/expire', passport.authenticate('bearer', { session: false }), route.user.expirePassword);
  
  /**
   * @api {get} /user/:id ABM Obtener
   * @apiName Get
   * @apiGroup User
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/user/:id', route.user.get);
  
  /**
   * @api {delete} /user/:id ABM Borrar
   * @apiName Delete
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission user.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/user/:id', checkPermission('user.delete'), route.user.delete);
  
  /**
   * @api {put} /user/:id ABM Cambio
   * @apiName Change
   * @apiGroup User
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission user.change
   *
   * @apiUse QueryModelId
   * @apiUse UserChangeParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/user/:id', checkPermission('user.change'), route.user.change);

  ////////////////////////////////////////

  // ABM Feriados
  /**
   * @apiDefine FeriadoParams
   * @apiParam {Date} fecha Fecha del feriado
   * @apiParam {String} [nombre] Nombre del feriado
   */

  /**
   * @api {get} /feriado ABM Listado
   * @apiName List
   * @apiGroup Feriado
   * @apiVersion 0.1.0
   *
   * @apiParam (QueryString) {String} [desde] Fecha de inicio para obtener resultados por rango ('DD/MM/YYYY')
   * @apiParam (QueryString) {String} [hasta] Fecha de fin para obtener feriados por rango ('DD/MM/YYYY')
   *
   * @apiUse ListSuccess
   */
  app.get('/feriado', route.feriado.list);

  /**
   * @api {post} /feriado ABM Crear
   * @apiName Add
   * @apiGroup Feriado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission feriado.add
   *
   * @apiUse FeriadoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/feriado', checkPermission('feriado.add'), route.feriado.add);

  /**
   * @api {get} /feriado/history ABM Listado Historico
   * @apiName History
   * @apiGroup Feriado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission feriado.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/feriado/history', checkPermission('feriado.history'), route.feriado.log);

  /**
   * @api {delete} /feriado/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Feriado
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization    
   * @apiPermission feriado.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/feriado/:id', checkPermission('feriado.delete'), route.feriado.delete);

  ////////////////////////////////////////////

  // ABM Tipo de Entidad
  /**
   * @apiDefine TipoEntidadParams
   * @apiParam {String} nombre Nombre del Tipo de Entidad
   */ 

  /**
   * @api {get} /entidad/tipo ABM Listado
   * @apiName List
   * @apiGroup Tipo de Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/entidad/tipo', route.tipo_entidad.list);

  /**
   * @api {post} /entidad/tipo ABM Crear
   * @apiName Add
   * @apiGroup Tipo de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_entidad.add
   *
   * @apiUse TipoEntidadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad/tipo', checkPermission('tipo_entidad.add'), route.tipo_entidad.add);

  /**
   * @api {get} /entidad/tipo/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tipo de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_entidad.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/tipo/history', checkPermission('tipo_entidad.history') ,route.tipo_entidad.log);

  /**
   * @api {get} /entidad/tipo/:id ABM Obtener
   * @apiName Get
   * @apiGroup Tipo de Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/entidad/tipo/:id', route.tipo_entidad.get);

  /**
   * @api {delete} /entidad/tipo/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Tipo de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_entidad.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/tipo/:id', checkPermission('tipo_entidad.delete'), route.tipo_entidad.delete);

  /**
   * @api {put} /entidad/tipo/:id ABM Cambio
   * @apiName Change
   * @apiGroup Tipo de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_entidad.change
   *
   * @apiUse QueryModelId
   * @apiUse TipoEntidadParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/entidad/tipo/:id', checkPermission('tipo_entidad.change'), route.tipo_entidad.change);

  ////////////////////////////////////

  // ABM IVA de Entidad
  /**
   * @apiDefine IvaEntidadParams
   * @apiParam {String} nombre Nombre del IVA de Entidad
   */ 

  /**
   * @api {get} /entidad/iva ABM Listado
   * @apiName List
   * @apiGroup IVA de Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/entidad/iva', route.iva_entidad.list);

  /**
   * @api {post} /entidad/iva ABM Crear
   * @apiName Add
   * @apiGroup IVA de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission iva_entidad.add
   *
   * @apiUse IvaEntidadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad/iva', checkPermission('iva_entidad.add'), route.iva_entidad.add);

  /**
   * @api {get} /entidad/iva/history ABM Listado Historico
   * @apiName History
   * @apiGroup IVA de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission iva_entidad.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/iva/history', checkPermission('iva_entidad.history'), route.iva_entidad.log);

  /**
   * @api {get} /entidad/iva/:id ABM Obtener
   * @apiName Get
   * @apiGroup IVA de Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/entidad/iva/:id', route.iva_entidad.get);

  /**
   * @api {delete} /entidad/iva/:id ABM Borrar
   * @apiName Delete
   * @apiGroup IVA de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission iva_entidad.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/iva/:id', checkPermission('iva_entidad.delete'), route.iva_entidad.delete);

  /**
   * @api {put} /entidad/iva/:id ABM Cambio
   * @apiName Change
   * @apiGroup IVA de Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission iva_entidad.change
   *
   * @apiUse QueryModelId
   * @apiUse IvaEntidadParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/entidad/iva/:id', checkPermission('iva_entidad.change'), route.iva_entidad.change);

  ///////////////////////////

  // ABM Cierre de Ejercicio de Entidad 
  /**
   * @apiDefine CierreEjercicioEntidadParams
   * @apiParam {String} nombre Nombre del Modelo
   */ 

  /**
   * @api {get} /entidad/cierre ABM Listado
   * @apiName List
   * @apiGroup Cierre de Ejercicio
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/entidad/cierre', route.cierre_ejercicio_entidad.list);

  /**
   * @api {post} /entidad/cierre ABM Crear
   * @apiName Add
   * @apiGroup Cierre de Ejercicio
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cierre_ejercicio_entidad.add
   *
   * @apiUse CierreEjercicioEntidadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad/cierre', checkPermission('cierre_ejercicio_entidad.add'), route.cierre_ejercicio_entidad.add);

  /**
   * @api {get} /entidad/cierre/history ABM Listado Historico
   * @apiName History
   * @apiGroup Cierre de Ejercicio
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cierre_ejercicio_entidad.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/cierre/history', checkPermission('cierre_ejercicio_entidad.history'),route.cierre_ejercicio_entidad.log);

  /**
   * @api {get} /entidad/cierre/:id ABM Obtener
   * @apiName Get
   * @apiGroup Cierre de Ejercicio
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/entidad/cierre/:id', route.cierre_ejercicio_entidad.get);

  /**
   * @api {delete} /entidad/cierre/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Cierre de Ejercicio
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cierre_ejercicio_entidad.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/cierre/:id', checkPermission('cierre_ejercicio_entidad.delete'), route.cierre_ejercicio_entidad.delete);
  
  /**
   * @api {put} /entidad/cierre/:id ABM Cambio
   * @apiName Change
   * @apiGroup Cierre de Ejercicio
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cierre_ejercicio_entidad.change
   *
   * @apiUse QueryModelId
   * @apiUse CierreEjercicioEntidadParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/entidad/cierre/:id', checkPermission('cierre_ejercicio_entidad.change'), route.cierre_ejercicio_entidad.change);

  ////////////////////////////////////

  // ABM Entidad 
  /**
   * @apiDefine EntidadParams
   * @apiParam {String} calle Calle 
   * @apiParam {Integer} numero Numero de calle
   * @apiParam {Integer} piso Piso
   * @apiParam {Integer} depto Numero de departamento
   * @apiParam {String{..10}} codigoPostal Codigo Postal 
   * @apiParam {String} localidad Localidad
   * @apiParam {String='Ciudad Autónoma de Buenos Aires', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'} provincia Provincia
   * @apiParam {Boolean} [miembro] Es miembro
   * @apiParam {Date} miembroDesde Fecha desde la que es miembro
   * @apiParam {String} [causaBaja] Causa de baja
   * @apiParam {String} razonSocial Razon Social
   * @apiParam {String{..14}} cuit CUIT
   * @apiParam {Date} [justiciaFecha] Fecha Inspeccion General de Justicia
   * @apiParam {String} [justiciaLegal] Justicia Legal
   * @apiParam {String} nombre Nombre de la Entidad
   * @apiParam {String} [urlCNV] URL CNV
   * @apiParam {[Object]} [tipos] Array con los ids de los tipos de entidad asociados (ej: [{ id: 1 }, { id: 2 }])
   * @apiParam {String} [codigoCafciCalificadora] Codigo Cafci de Calificadora (Obligatorio si la entidad es de tipo "calificadora")
   * @apiParam {String} [codigoCNV] Codigo CNV
   * @apiParam {Integer} paisId Id de pais asociado
   * @apiParam {Integer} actividadId Id de actividad asociada
   * @apiParam {Integer} ivaEntidadId Id de IVA asociada
   * @apiParam {Integer} [cierreEjercicioEntidadId] Id de Cierre de Ejercicio asociado
   */ 

  /**
   * @api {get} /entidad ABM Listado
   * @apiName List
   * @apiGroup Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/entidad', route.entidad.list);

  /**
   * @api {post} /entidad ABM Crear
   * @apiName Add
   * @apiGroup Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.add
   *
   * @apiUse EntidadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad', checkPermission('entidad.add'), route.entidad.add);

    /**
   * @api {get} /entidad/history ABM Listado Historico
   * @apiName History
   * @apiGroup Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/history', checkPermission('entidad.history'),route.entidad.log);

  /**
   * @api {get} /entidad/:id ABM Obtener
   * @apiName Get
   * @apiGroup Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/entidad/:id', route.entidad.get);

  /**
   * @api {delete} /entidad/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/:id', checkPermission('entidad.delete'), route.entidad.delete);

  /**
   * @api {put} /entidad/:id ABM Cambio
   * @apiName Change
   * @apiGroup Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.change
   *
   * @apiUse QueryModelId
   * @apiUse EntidadParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/entidad/:id', checkPermission('entidad.change'), route.entidad.change);

  ////////////////////////////////////

  // ABM Entidad Controlada
  /**
   * @apiDefine ControladoraQueryString
   * @apiParam (QueryString) {Integer} parent_id ID de la entidad controladora
   */ 
  
  /**
   * @apiDefine IvaEntidadParams
   * @apiParam {Integer} controladaId Id de la entidad controlada
   */ 

  /** 
   * @api {get} /entidad/:parent_id/controla ABM Listado
   * @apiName List
   * @apiGroup Entidad Controlada
   * @apiVersion 0.1.0
   * @apiDescription Lista de entidades controladas por entidad
   *
   * @apiUse ControladoraQueryString
   *
   * @apiUse ListSuccess
   */
  app.get('/entidad/:parent_id/controla', route.entidad_controlada.list);

  /**
   * @api {post} /entidad/:parent_id/controla ABM Crear
   * @apiName Add
   * @apiGroup Entidad Controlada
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.controlada.add
   *
   * @apiUse ControladoraQueryString
   * @apiUse IvaEntidadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad/:parent_id/controla', checkPermission('entidad.controlada.add'), route.entidad_controlada.add);

    /**
   * @api {get} /entidad/:parent_id/controla/history ABM Listado Historico
   * @apiName History
   * @apiGroup Entidad Controlada
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.controlada.history
   *
   * @apiUse ControladoraQueryString
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/:parent_id/controla/history', checkPermission('entidad.controlada.history') ,route.entidad_controlada.log);
  
  /**
   * @api {delete} /entidad/:parent_id/controla/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Entidad Controlada
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.controlada.delete
   *
   * @apiUse ControladoraQueryString
   * @apiParam (QueryString) {Integer} id ID de la entidad controlada
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/:parent_id/controla/:id', checkPermission('entidad.controlada.delete'), route.entidad_controlada.delete);

  ////////////////////////////////////

  // ABM Comunicacion Entidad 
  /**
   * @apiDefine ComunicacionEntidadParams
   * @apiParam {string} tipo Tipo de comunicacion
   * @apiParam {Boolean} [web] Es web
   * @apiParam {string} valor Valor
   */ 

  /**
   * @api {get} /entidad/:parent_id/comunicacion ABM Listado
   * @apiName List
   * @apiGroup Comunicacion Entidad
   * @apiVersion 0.1.0
   * @apiDescription Lista de comunicaciones de la entidad
   *
   * @apiUse EntidadQueryString 
   *
   * @apiUse ListSuccess 
   */
  app.get('/entidad/:parent_id/comunicacion', route.comunicacion_entidad.list);

  /**
   * @api {post} /entidad/:parent_id/comunicacion ABM Crear
   * @apiName Add
   * @apiGroup Comunicacion Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission comunicacion_entidad.add
   *
   * @apiUse EntidadQueryString
   * @apiUse ComunicacionEntidadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad/:parent_id/comunicacion', checkPermission('comunicacion_entidad.add'), route.comunicacion_entidad.add);

    /**
   * @api {get} /entidad/:parent_id/comunicacion/history ABM Listado Historico
   * @apiName History
   * @apiGroup Comunicacion Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission comunicacion_entidad.history
   *
   * @apiUse EntidadQueryString
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/:parent_id/comunicacion/history', checkPermission('comunicacion_entidad.history') ,route.comunicacion_entidad.log);

  /**
   * @api {get} /entidad/:parent_id/comunicacion/:id ABM Obtener
   * @apiName Get
   * @apiGroup Comunicacion Entidad
   * @apiVersion 0.1.0
   *
   * @apiUse EntidadQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/entidad/:parent_id/comunicacion/:id', route.comunicacion_entidad.get);

  /**
   * @api {delete} /entidad/:parent_id/comunicacion/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Comunicacion Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission comunicacion_entidad.delete
   *
   * @apiUse EntidadQueryString
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/:parent_id/comunicacion/:id', checkPermission('comunicacion_entidad.delete'), route.comunicacion_entidad.delete);

  /**
   * @api {put} /entidad/:parent_id/comunicacion/:id ABM Cambio
   * @apiName Change
   * @apiGroup Comunicacion Entidad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission comunicacion_entidad.change
   *
   * @apiUse EntidadQueryString
   * @apiUse QueryModelId
   * @apiUse ComunicacionEntidadParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/entidad/:parent_id/comunicacion/:id', checkPermission('comunicacion_entidad.change'), route.comunicacion_entidad.change);

  //////////////////////////////

  // ABM Calificacion Fondo
  /**
   * @apiDefine CalificacionFondoParams
   * @apiParam {String{..10}} calificacion Calificacion del fondo
   * @apiParam {Integer} fondoId Id del fondo
   */ 

  /**
   * @apiDefine QueryFondoId
   * @apiParam (QueryString) {Integer} id ID del fondo
   */

  /** 
   * @api {get} /entidad/:parent_id/calificacion-fondo ABM Listado
   * @apiName List
   * @apiGroup Calificacion Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse EntidadQueryString 
   *
   * @apiUse ListSuccess
   */
  app.get('/entidad/:parent_id/calificacion-fondo', route.calificacion_fondo.list);

  /**
   * @api {get} /entidad/:parent_id/calificacion-fondo/history ABM Listado Historico
   * @apiName History
   * @apiGroup Calificacion Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.calificacion_fondo.history
   *
   * @apiUse EntidadQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/entidad/:parent_id/calificacion-fondo/history', checkPermission('entidad.calificacion_fondo.history'), route.calificacion_fondo.log);  

    /**
   * @api {get} /entidad/:parent_id/calificacion-fondo/:id ABM Obtener
   * @apiName Get
   * @apiGroup Calificacion Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse EntidadQueryString
   * @apiUse QueryFondoId
   *
   * @apiUse GetSuccess
   */
  app.get('/entidad/:parent_id/calificacion-fondo/:id', route.calificacion_fondo.get);

  /**
   * @api {post} /entidad/:parent_id/calificacion-fondo ABM Crear
   * @apiName Add
   * @apiGroup Calificacion Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.calificacion_fondo.add
   *
   * @apiUse EntidadQueryString
   * @apiUse CalificacionFondoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/entidad/:parent_id/calificacion-fondo', checkPermission('entidad.calificacion_fondo.add'), route.calificacion_fondo.add);

  /**
   * @api {delete} /entidad/:parent_id/calificacion-fondo/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Calificacion Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.calificacion_fondo.delete
   *
   * @apiUse EntidadQueryString
   * @apiUse QueryFondoId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/entidad/:parent_id/calificacion-fondo/:id', checkPermission('entidad.calificacion_fondo.delete'), route.calificacion_fondo.delete);

  /**
   * @api {put} /entidad/:parent_id/calificacion-fondo/:id ABM Cambio
   * @apiName Change
   * @apiGroup Calificacion Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission entidad.calificacion_fondo.change
   *
   * @apiUse EntidadQueryString
   * @apiUse QueryFondoId
   * @apiParam {String{..10}} calificacion Calificacion del fondo
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/entidad/:parent_id/calificacion-fondo/:id', checkPermission('entidad.calificacion_fondo.change'), route.calificacion_fondo.change);

  ////////////////////////////////

  // ABM Roles
  /**
   * @apiDefine RolParams
   * @apiParam {String} nombre Nombre del Rol
   * @apiParam {[Object]} permisos Array con los nombres de los permisos (ej: [{ nombre: 'permiso1' }, { nombre: 'permiso2' }])
   */ 

  /**
   * @api {get} /rol ABM Listado
   * @apiName List
   * @apiGroup Rol
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/rol', route.rol.list);

  /**
   * @api {post} /rol ABM Crear
   * @apiName Add
   * @apiGroup Rol
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission rol.add
   *
   * @apiUse RolParams
   *
   * @apiUse AddSuccess
   */
  // app.post('/rol', checkPermission('rol.add'), route.rol.add);

  /**
   * @api {get} /rol/history ABM Listado Historico
   * @apiName History
   * @apiGroup Rol
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission rol.history
   *
   * @apiUse HistorySuccess
   */
  // app.get('/rol/history', checkPermission('rol.history'), route.rol.log);

  /**
   * @api {get} /rol/:id ABM Obtener
   * @apiName Get
   * @apiGroup Rol
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/rol/:id', route.rol.get);

  /**
   * @api {delete} /rol/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Rol
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission rol.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  // app.delete('/rol/:id', checkPermission('rol.delete'), route.rol.delete);

  /**
   * @api {put} /rol/:id ABM Cambio
   * @apiName Change
   * @apiGroup Rol
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission rol.change
   *
   * @apiUse QueryModelId
   * @apiUse RolParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  // app.put('/rol/:id', checkPermission('rol.change'), route.rol.change);

    /**
   * @api {get} /rol/:parent_id/permisos/history ABM Listado Historico de Permisos
   * @apiName PermisosHistory
   * @apiGroup Rol
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission rol.history
   *
   * @apiUse QueryModelId
   *
   * @apiUse HistorySuccess
   */
  // app.get('/rol/:parent_id/permisos/history',checkPermission('rol.history'), route.rol.permission.log);

  ////////////////////////////

  // ABM Ticker Activo
  /**
   * @apiDefine ActivoQueryString
   * @apiParam (QueryString) {Integer} parent_id ID del activo padre
   */ 

  /**
   * @apiDefine TickerParams
   * @apiParam {String{..20}} ticker Ticker
   * @apiParam {Integer} tipoId Id de Tipo de Ticker
   * @apiParam {Integer} monedaId Id de Moneda
   * @apiParam {Integer} mercadoId Id de Mercado
   */

  /**
   * @api {get} /activo/ticker ABM Listado Todos
   * @apiName List
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/ticker', route.ticker_activo.listAll);     

  /**
   * @api {get} /activo/:parent_id/ticker ABM Listado
   * @apiName List
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ActivoQueryString 
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/:parent_id/ticker', route.ticker_activo.list);

  /**
   * @api {post} /activo/:parent_id/ticker ABM Crear
   * @apiName Add
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission ticker_activo.add
   *
   * @apiUse ActivoQueryString
   * @apiUse TickerParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/:parent_id/ticker', checkPermission('ticker_activo.add'), route.ticker_activo.add);

    /**
   * @api {get} /activo/:parent_id/ticker/history ABM Listado Historico
   * @apiName History
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission ticker_activo.history
   *
   * @apiUse ActivoQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/:parent_id/ticker/history', checkPermission('ticker_activo.history') ,route.ticker_activo.log);

  /**
   * @api {get} /activo/:parent_id/ticker/:id ABM Obtener
   * @apiName Get
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ActivoQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/activo/:parent_id/ticker/:id', route.ticker_activo.get);

  /**
   * @api {delete} /activo/:parent_id/ticker/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission ticker_activo.delete
   *
   * @apiUse ActivoQueryString
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/:parent_id/ticker/:id', checkPermission('ticker_activo.delete'), route.ticker_activo.delete);

  /**
   * @api {put} /activo/:parent_id/ticker/:id ABM Cambio
   * @apiName Change
   * @apiGroup Ticker Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission ticker_activo.change
   *
   * @apiUse ActivoQueryString
   * @apiUse QueryModelId
   * @apiUse TickerParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/:parent_id/ticker/:id', checkPermission('ticker_activo.change'), route.ticker_activo.change);

  ////////////////////////////

  //ABM Dolar Transferencia Implicito
  /**
   * @apiDefine DtiQueryString
   * @apiParam (QueryString) {Integer} parent_id ID del activo padre
   * @apiParam (QueryString) {String} fecha Fecha del DTI ('YYYY-MM-DD')
   */ 

  /**
   * @apiDefine DtiParams
   * @apiParam {String{1..10}} adrNy ADR Nueva York (6 enteros, 4 decimales)
   * @apiParam {String{1..10}} accionBsAs Accion Buenos Aires (6 enteros, 4 decimales)
   */

  /**
   * @api {get} /activo/dolar-transferencia-implicito ABM Listado
   * @apiName List
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/dolar-transferencia-implicito', route.dolar_transferencia_implicito.list);

  /**
   * @api {post} /activo/:parent_id/dolar-transferencia-implicito/:fecha ABM Crear
   * @apiName Add
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission dolar_transferencia_implicito.add
   *
   * @apiUse DtiQueryString
   * @apiUse DtiParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/:parent_id/dolar-transferencia-implicito/:fecha', checkPermission('dolar_transferencia_implicito.add'), route.dolar_transferencia_implicito.add);

  /**
   * @api {post} /activo/dolar-transferencia-implicito/:fecha ABM Crear Multiples
   * @apiName Add
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission dolar_transferencia_implicito.add
   *
   * @apiUse DtiQueryString
   * @apiParam {Object[]} dtis array con las dtis a crear.
   * @apiParam {String{1..10}} dtis.adrNy ADR Nueva York (6 enteros, 4 decimales)
   * @apiParam {String{1..10}} dtis.accionBsAs Accion Buenos Aires (6 enteros, 4 decimales)   
   * @apiparam {Integer} dtis.activoId ID del activo padre.
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/dolar-transferencia-implicito/:fecha', checkPermission('dolar_transferencia_implicito.add'), route.dolar_transferencia_implicito.addMany);  

  /**
   * @api {get} /activo/dolar-transferencia-implicito/history ABM Listado Historico
   * @apiName History
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission dolar_transferencia_implicito.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/dolar-transferencia-implicito/history', checkPermission('dolar_transferencia_implicito.history'),route.dolar_transferencia_implicito.log);
  
  /**
   * @api {get} /activo/:parent_id/dolar-transferencia-implicito/:fecha ABM Obtener
   * @apiName Get
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   *
   * @apiUse DtiQueryString
   *
   * @apiUse GetSuccess
   */
   
  app.get('/activo/:parent_id/dolar-transferencia-implicito/:fecha', route.dolar_transferencia_implicito.get);

   /**
   * @api {put} /activo/:parent_id/dolar-transferencia-implicito/:fecha ABM Cambio
   * @apiName Change
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission dolar_transferencia_implicito.change
   *
   * @apiUse DtiQueryString
   * @apiUse DtiParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/:parent_id/dolar-transferencia-implicito/:fecha', checkPermission('dolar_transferencia_implicito.change'), route.dolar_transferencia_implicito.change); 
  
  /**
   * @api {delete} /activo/:parent_id/dolar-transferencia-implicito/:fecha ABM Borrar
   * @apiName Delete
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission dolar_transferencia_implicito.delete
   *
   * @apiUse DtiQueryString
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/:parent_id/dolar-transferencia-implicito/:fecha', checkPermission('dolar_transferencia_implicito.delete'), route.dolar_transferencia_implicito.delete);

  /**
   * @api {get} /activo/dolar-transferencia-implicito/:fecha/reporte ABM Obtener
   * @apiName Get
   * @apiGroup Dolar Transferencia Implicito
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission dolar_transferencia_implicito.reportes
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Envia el reporte para descargar.
   */
  app.get('/activo/dolar-transferencia-implicito/:fecha/reporte', downloadCheckPermission('dolar_transferencia_implicito.reportes') ,route.dolar_transferencia_implicito.reporte);

  //////////////////

  //ABM Alias Activo
  
  /**
   * @api {get} /activo/:id/alias ABM Listado
   * @apiName List
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   *
   * @apiParam (QueryString) {Integer} id ID del activo
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/:id/alias', checkPermission('aliasActivo.allAlias'), route.aliasActivo.listForActivo);

  /**
   * @api {get} /activo/alias/entidad/:entidadId ABM Listado
   * @apiName List
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   *
   * @apiParam (QueryString) {Integer} entidadId ID de la entidad
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/alias/entidad/:entidadId',checkPermission('aliasActivo.allAlias'), route.aliasActivo.listForEntidad);

  /**
   * @api {get} /activo/alias/list ABM Listado Todos
   * @apiName List
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/alias/list', route.aliasActivo.listAll);  

  /**
   * @api {get} /activo/alias ABM Listado
   * @apiName List
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasActivo.list
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/alias', checkPermission('aliasActivo.list'), route.aliasActivo.list);
  
  /**
   * @api {post} /activo/alias ABM Crear
   * @apiName Add
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiDescription Toma la entidadId de la entidad asociada al usuario
   * @apiUse HeaderAuthorization
   * @apiPermission aliasActivo.add
   *
   * @apiParam {Integer} activoId Id del activo
   * @apiParam {String} aliasInterno alias
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/alias', checkPermission('aliasActivo.add'), route.aliasActivo.add);
  
  /**
   * @api {get} /activo/alias/history ABM Listado Historico
   * @apiName History
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasActivo.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/alias/history', checkPermission('aliasActivo.history'), route.aliasActivo.log);
  
  /**
   * @api {delete} /activo/:id/alias ABM Borrar
   * @apiName Delete
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasActivo.delete
   *
   * @apiParam (QueryString) {Integer} id ID del activo
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/:id/alias', checkPermission('aliasActivo.delete'), route.aliasActivo.delete);
  
  /**
   * @api {put} /activo/:id/alias ABM Cambio
   * @apiName Change
   * @apiGroup Alias Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasActivo.change
   *
   * @apiParam (QueryString) {Integer} id ID del activo
   * @apiParam {String} aliasInterno alias
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/:id/alias', checkPermission('aliasActivo.change'), route.aliasActivo.change);

  //////////////////////

  // ABM Clases de Activo
  /**
   * @apiDefine ClaseActivoParams
   * @apiParam {String} nombre Nombre
   * @apiParam {String} [codigoCNV] Codigo CNV
   */

  /**
   * @api {get} /activo/clase ABM Listado
   * @apiName List
   * @apiGroup Clase Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/clase', route.clase_activo.list);

  /**
   * @api {post} /activo/clase ABM Crear
   * @apiName Add
   * @apiGroup Clase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo.add
   *
   * @apiUse ClaseActivoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/clase', checkPermission('clase_activo.add'), route.clase_activo.add);

  /**
   * @api {get} /activo/clase/history ABM Listado Historico
   * @apiName History
   * @apiGroup Clase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/clase/history', checkPermission('clase_activo.history'), route.clase_activo.log);

  /**
   * @api {get} /activo/clase/:id ABM Obtener
   * @apiName Get
   * @apiGroup Clase Activo
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/activo/clase/:id', route.clase_activo.get);

  /**
   * @api {delete} /activo/clase/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Clase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/clase/:id', checkPermission('clase_activo.delete'), route.clase_activo.delete);

  /**
   * @api {put} /activo/clase/:id ABM Cambio
   * @apiName Change
   * @apiGroup Clase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo.change
   *
   * @apiUse QueryModelId
   * @apiUse ClaseActivoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/clase/:id', checkPermission('clase_activo.change'), route.clase_activo.change);
  
  ////////////////////////////////////

  // ABM Subclase de Activo
  /**
   * @apiDefine ClaseQueryString
   * @apiParam (QueryString) {Integer} parent_id ID de la clase madre
   */ 

  /**
   * @apiDefine SubclaseActivoParams
   * @apiParam {String} nombre Nombre de la Subclase
   * @apiParam {Boolean} [necesitaEmisora] Necesita Emisora 
   * @apiParam {Boolean} [necesitaOrganizadora] Necesita Organizadora 
   * @apiParam {Boolean} [necesitaTitulo] Necesita Titulo 
   * @apiParam {Boolean} [necesitaAmbitoDeTitulo] Necesita Ambito de Titulo 
   * @apiParam {Boolean} [necesitaCuentaCorriente] Necesita Cuenta Corriente
   * @apiParam {Boolean} [necesitaClasificacion] Necesita Clasificacion
   * @apiParam {Boolean} [necesitaActivoSubyacente] Necesita Activo Subyacente
   */ 

  /**
   * @api {get} /activo/clase/:parent_id/subclase ABM Listado
   * @apiName List
   * @apiGroup Subclase Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ClaseQueryString 
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/clase/:parent_id/subclase', route.subclase_activo.list);

  /**
   * @api {post} /activo/clase/:parent_id/subclase ABM Crear
   * @apiName Add
   * @apiGroup Subclase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo.add
   *
   * @apiUse ClaseQueryString
   * @apiUse SubclaseActivoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/clase/:parent_id/subclase', checkPermission('subclase_activo.add'), route.subclase_activo.add);

  /**
   * @api {get} /activo/clase/:parent_id/subclase/history ABM Listado Historico
   * @apiName History
   * @apiGroup Subclase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo.history
   *
   * @apiUse ClaseQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/clase/:parent_id/subclase/history', checkPermission('subclase_activo.history'), route.subclase_activo.log);

  /**
   * @api {get} /activo/clase/:parent_id/subclase/:id ABM Obtener
   * @apiName Get
   * @apiGroup Subclase Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ClaseQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/activo/clase/:parent_id/subclase/:id', route.subclase_activo.get);

  /**
   * @api {delete} /activo/clase/:parent_id/subclase/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Subclase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo.delete
   *
   * @apiUse ClaseQueryString
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/clase/:parent_id/subclase/:id', checkPermission('subclase_activo.delete'), route.subclase_activo.delete);

  /**
   * @api {put} /activo/clase/:parent_id/subclase/:id ABM Cambio
   * @apiName Change
   * @apiGroup Subclase Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo.change
   *
   * @apiUse ClaseQueryString
   * @apiUse QueryModelId
   * @apiUse SubclaseActivoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/clase/:parent_id/subclase/:id', checkPermission('subclase_activo.change'), route.subclase_activo.change);
  
  /////////////////////////////
  
  // ABM Clases de Activo CNV
  /**
   * @apiDefine ClaseCnvActivoParams
   * @apiParam {String} nombre Nombre
   */

  /**
   * @api {get} /activo/clase-cnv ABM Listado
   * @apiName List
   * @apiGroup Clase Activo CNV
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/clase-cnv', route.clase_activo_cnv.list);

  /**
   * @api {post} /activo/clase-cnv ABM Crear
   * @apiName Add
   * @apiGroup Clase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo_cnv.add
   *
   * @apiUse ClaseCnvActivoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/clase-cnv', checkPermission('clase_activo_cnv.add'), route.clase_activo_cnv.add);

  /**
   * @api {get} /activo/clase-cnv/history ABM Listado Historico
   * @apiName History
   * @apiGroup Clase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo_cnv.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/clase-cnv/history', checkPermission('clase_activo_cnv.history') ,route.clase_activo_cnv.log);

  /**
   * @api {get} /activo/clase-cnv/:id ABM Obtener
   * @apiName Get
   * @apiGroup Clase Activo CNV
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/activo/clase-cnv/:id', route.clase_activo_cnv.get);

  /**
   * @api {delete} /activo/clase-cnv/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Clase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo_cnv.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/clase-cnv/:id', checkPermission('clase_activo_cnv.delete'), route.clase_activo_cnv.delete);

  /**
   * @api {put} /activo/clase-cnv/:id ABM Cambio
   * @apiName Change
   * @apiGroup Clase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_activo_cnv.change
   *
   * @apiUse QueryModelId
   * @apiUse ClaseCnvActivoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/clase-cnv/:id', checkPermission('clase_activo_cnv.change'), route.clase_activo_cnv.change);

  ////////////////////////////////////

  // ABM Subclase de Activo CNV
  /**
   * @apiDefine SubclaseCnvActivoParams
   * @apiParam {String} nombre Nombre
   */

  /**
   * @api {get} /activo/clase-cnv/:parent_id/subclase-cnv ABM Listado
   * @apiName List
   * @apiGroup Subclase Activo CNV
   * @apiVersion 0.1.0
   *
   * @apiUse ClaseQueryString 
   *
   * @apiUse ListSuccess
   */
  app.get('/activo/clase-cnv/:parent_id/subclase-cnv', route.subclase_activo_cnv.list);

  /**
   * @api {post} /activo/clase-cnv/:parent_id/subclase-cnv ABM Crear
   * @apiName Add
   * @apiGroup Subclase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo_cnv.add
   *
   * @apiUse ClaseQueryString
   * @apiUse SubclaseCnvActivoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo/clase-cnv/:parent_id/subclase-cnv', checkPermission('subclase_activo_cnv.add'), route.subclase_activo_cnv.add);

  /**
   * @api {get} /activo/clase-cnv/:parent_id/subclase-cnv/history ABM Listado Historico
   * @apiName History
   * @apiGroup Subclase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo_cnv.history
   *
   * @apiUse ClaseQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/clase-cnv/:parent_id/subclase-cnv/history', checkPermission('subclase_activo_cnv.history'), route.subclase_activo_cnv.log);

  /**
   * @api {get} /activo/clase-cnv/:parent_id/subclase-cnv/:id ABM Obtener
   * @apiName Get
   * @apiGroup Subclase Activo CNV
   * @apiVersion 0.1.0
   *
   * @apiUse ClaseQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/activo/clase-cnv/:parent_id/subclase-cnv/:id', route.subclase_activo_cnv.get);

  /**
   * @api {delete} /activo/clase-cnv/:parent_id/subclase-cnv/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Subclase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo_cnv.delete
   *
   * @apiUse ClaseQueryString
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/clase-cnv/:parent_id/subclase-cnv/:id', checkPermission('subclase_activo_cnv.delete'), route.subclase_activo_cnv.delete);

  /**
   * @api {put} /activo/clase-cnv/:parent_id/subclase-cnv/:id ABM Cambio
   * @apiName Change
   * @apiGroup Subclase Activo CNV
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission subclase_activo_cnv.change
   *
   * @apiUse ClaseQueryString
   * @apiUse QueryModelId
   * @apiUse SubclaseCnvActivoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/clase-cnv/:parent_id/subclase-cnv/:id', checkPermission('subclase_activo_cnv.change'), route.subclase_activo_cnv.change);

  /////////////////////////////

  // ABM Activo 
  /**
   * @apiDefine ActivoParams
   * @apiParam {String} nombre Nombre 
   * @apiParam {String} [nombreLargo] Nombre Largo 
   * @apiParam {Boolean} [ssnIncisoK] SSN Inciso K
   * @apiParam {Boolean} [regimenPymes] Regimen Pymes
   * @apiParam {String='Pymes','Regional e Infraestructura','Proyectos Innovación Tecnológica','Ninguno','Pymes e Infraestructura'} pitn PITN
   * @apiParam {String='Activo','Provisorio','Durmiente','Zombie'} estado Estado
   * @apiParam {Integer} subclaseId Id de Subclase de Activo
   * @apiParam {Integer} subclaseCnvId Id de Subclase CNV de Activo
   * @apiParam {Integer} claseId Id de Clase de Activo
   * @apiParam {Integer} claseCnvId Id de Clase CNV de Activo
   * @apiParam {Integer} monedaId Id de Moneda
   * @apiParam (necesitaEmisora) {Integer} emisoraId Id de Entidad Emisora
   * @apiParam (necesitaOrganizadora) {Integer} organizadoraId Id de Entidad Organizadora
   * @apiParam (necesitaCuentaCorriente) {Boolean} ctaCteRemunerada Cuenta Corriente Remunerada
   * @apiParam (necesitaClasificacion) {Integer} clasificacionId Id de Clasificacion
   * @apiParam (necesitaActivoSubyacente) {Integer} subyacenteId Id de Activo Subyacente 
   * @apiParam (necesitaActivoSubyacente) {Integer} subyacenteCantidad Cantidad de Subyacente
   * @apiParam (necesitaActivoSubyacente) {Integer} subyacenteCantidadRdd Cantidad de Subyacente RDD
   * @apiParam (necesitaActivoSubyacente) {Boolean} [participaDTI] Participa DTI
   * @apiParam (necesitaTitulo) {String='Amortizable','Bullet','Cupon 0'} tituloClase Clase de Titulo
   * @apiParam (necesitaTitulo) {String='Bono', 'Letra', 'Nota'} tituloTipo Tipo de Titulo
   * @apiParam (necesitaTitulo) {Date} tituloFechaEmision Fecha de emision de titulo
   * @apiParam (necesitaTitulo) {Date} tituloFechaVencimiento Fecha de Vencimiento de titulo
   * @apiParam (necesitaTitulo) {Boolean} [tituloLebacNobacInterna] Titulo Lebac Nobac Interna
   * @apiParam (necesitaTitulo) {Boolean} [tituloDolarLinked] Titulo Dolar Linked
   * @apiParam (necesitaTitulo) {String{1..8}} tituloMontoEmitido Titulo Monto Emitido (4 enteros, 4 decimales)
   * @apiParam (necesitaTitulo) {Date} [tituloFechaTasa] Fecha de Tasa de titulo
   * @apiParam (necesitaTitulo) {String{0..8}} [tituloTasa] Tasa de titulo (4 enteros, 4 decimales)
   * @apiParam (necesitaAmbitoDeTitulo) {String='Internacional', 'Nacional', 'Provincial', 'Municipal'} tituloAmbito Ambito de Titulo
   */

  /**
   * @api {get} /activo ABM Listado
   * @apiName List
   * @apiGroup Activo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/activo', route.activo.list);

  /**
   * @api {post} /activo ABM Crear
   * @apiName Add
   * @apiGroup Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission activo.add
   *
   * @apiUse ActivoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/activo', checkPermission('activo.add'), route.activo.add);

  /**
   * @api {get} /activo/history ABM Listado Historico
   * @apiName History
   * @apiGroup Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission activo.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/history', checkPermission('activo.history'), route.activo.log);

  /**
   * @api {get} /activo/:id ABM Obtener
   * @apiName Get
   * @apiGroup Activo
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/activo/:id', route.activo.get);

  /**
   * @api {delete} /activo/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission activo.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/activo/:id', checkPermission('activo.delete'), route.activo.delete);

  /**
   * @api {put} /activo/:id ABM Cambio
   * @apiName Change
   * @apiGroup Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission activo.change
   *
   * @apiUse QueryModelId
   * @apiUse ActivoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/:id', checkPermission('activo.change'), route.activo.change);

  ////////////////////////////

  //ABM Tipo de renta mixta
  /**
   * @apiDefine TipoRentaMixtaParams
   * @apiParam {String} nombre Nombre 
   * @apiParam {String} codigoCafci Codigo Cafci
   * @apiParam {String{3}} orden Campo de Orden
   */

  /**
   * @api {get} /tipo-renta-mixta ABM Listado
   * @apiName List
   * @apiGroup Tipo de renta mixta
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/tipo-renta-mixta', route.tipoRentaMixta.list);
  
  /**
   * @api {post} /tipo-renta-mixta ABM Crear
   * @apiName Add
   * @apiGroup Tipo de renta mixta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRentaMixta.add
   *
   * @apiUse TipoRentaMixtaParams
   *
   * @apiUse AddSuccess
   */
  app.post('/tipo-renta-mixta', checkPermission('tipoRentaMixta.add'), route.tipoRentaMixta.add);

  /**
   * @api {get} /tipo-renta-mixta/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tipo de renta mixta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRentaMixta.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/tipo-renta-mixta/history', checkPermission('tipoRentaMixta.history'),route.tipoRentaMixta.log);
  
  /**
   * @api {get} /tipo-renta-mixta/:id ABM Obtener
   * @apiName Get
   * @apiGroup Tipo de renta mixta
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/tipo-renta-mixta/:id', route.tipoRentaMixta.get);
  
  /**
   * @api {delete} /tipo-renta-mixta/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Tipo de renta mixta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRentaMixta.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/tipo-renta-mixta/:id', checkPermission('tipoRentaMixta.delete'), route.tipoRentaMixta.delete);
  
  /**
   * @api {put} /tipo-renta-mixta/:id ABM Cambio
   * @apiName Change
   * @apiGroup Tipo de renta mixta
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRentaMixta.change
   *
   * @apiUse QueryModelId
   * @apiUse TipoRentaMixtaParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/tipo-renta-mixta/:id', checkPermission('tipoRentaMixta.change'), route.tipoRentaMixta.change);

  ////////////////////////////
  
  //ABM Tipo de ticker
  /**
   * @apiDefine TipoRentaMixtaParams
   * @apiParam {String} nombre Nombre 
   * @apiParam {String} nombreLargo Nombre Largo 
   * @apiParam {String} codigo Codigo
   * @apiParam {Boolean} incluyeMercado Incluye Mercado
   * @apiParam {Boolean} incluyeMoneda Incluye Moneda
   * @apiParam {Integer} entidadId Id de la entidad a la que corresponde el tipo de ticker
   */

  /**
   * @api {get} /tipo-ticker ABM Listado
   * @apiName List
   * @apiGroup Tipo de ticker
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/tipo-ticker', route.tipoTicker.list);
  
  /**
   * @api {post} /tipo-ticker ABM Crear
   * @apiName Add
   * @apiGroup Tipo de ticker
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoTicker.add
   *
   * @apiUse TipoRentaMixtaParams
   *
   * @apiUse AddSuccess
   */
  app.post('/tipo-ticker', checkPermission('tipoTicker.add'), route.tipoTicker.add);

  /**
   * @api {get} /tipo-ticker/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tipo de ticker
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoTicker.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/tipo-ticker/history', checkPermission('tipoTicker.history'), route.tipoTicker.log);
  
  /**
   * @api {get} /tipo-ticker/:id ABM Obtener
   * @apiName Get
   * @apiGroup Tipo de ticker
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/tipo-ticker/:id', route.tipoTicker.get);
  
  /**
   * @api {delete} /tipo-ticker/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Tipo de ticker
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoTicker.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/tipo-ticker/:id', checkPermission('tipoTicker.delete'), route.tipoTicker.delete);
  
  /**
   * @api {put} /tipo-ticker/:id ABM Cambio
   * @apiName Change
   * @apiGroup Tipo de ticker
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoTicker.change
   *
   * @apiUse QueryModelId
   * @apiUse TipoRentaMixtaParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/tipo-ticker/:id', checkPermission('tipoTicker.change'), route.tipoTicker.change);
  
  ////////////////////////////

  //ABM Actividad
  /**
   * @apiDefine ActividadParams
   * @apiParam {String} nombre Nombre 
   */

  /**
   * @api {get} /actividad ABM Listado
   * @apiName List
   * @apiGroup Actividad
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/actividad', route.actividad.list);
  
  /**
   * @api {post} /actividad ABM Crear
   * @apiName Add
   * @apiGroup Actividad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission actividad.add
   *
   * @apiUse ActividadParams
   *
   * @apiUse AddSuccess
   */
  app.post('/actividad', checkPermission('actividad.add'), route.actividad.add);

  /**
   * @api {get} /actividad/history ABM Listado Historico
   * @apiName History
   * @apiGroup Actividad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission actividad.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/actividad/history', checkPermission('actividad.history'),route.actividad.log);
  
  /**
   * @api {get} /actividad/:id ABM Obtener
   * @apiName Get
   * @apiGroup Actividad
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/actividad/:id', route.actividad.get);
  
  /**
   * @api {delete} /actividad/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Actividad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission actividad.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/actividad/:id', checkPermission('actividad.delete'), route.actividad.delete);
  
  /**
   * @api {put} /actividad/:id ABM Cambio
   * @apiName Change
   * @apiGroup Actividad
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission actividad.change
   *
   * @apiUse QueryModelId
   * @apiUse ActividadParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/actividad/:id', checkPermission('actividad.change'), route.actividad.change);

  ////////////////////////////

  //ABM Clasificacion
  /**
   * @apiDefine ClasificacionParams
   * @apiParam {String} nombre Nombre 
   * @apiParam {String} codigoCafci Codigo Cafci
   * @apiParam {Boolean} mercadoDinero Es Mercado de Dinero
   */

  /**
   * @api {get} /clasificacion ABM Listado
   * @apiName List
   * @apiGroup Clasificacion
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/clasificacion', route.clasificacion.list);
  
  /**
   * @api {post} /clasificacion ABM Crear
   * @apiName Add
   * @apiGroup Clasificacion
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clasificacion.add
   *
   * @apiUse ClasificacionParams
   *
   * @apiUse AddSuccess
   */
  app.post('/clasificacion', checkPermission('clasificacion.add') ,route.clasificacion.add);

  /**
   * @api {get} /clasificacion/history ABM Listado Historico
   * @apiName History
   * @apiGroup Clasificacion
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clasificacion.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/clasificacion/history', checkPermission('clasificacion.history'),route.clasificacion.log);
  
  /**
   * @api {get} /clasificacion/:id ABM Obtener
   * @apiName Get
   * @apiGroup Clasificacion
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/clasificacion/:id', route.clasificacion.get);
  
  /**
   * @api {delete} /clasificacion/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Clasificacion
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipoRentaMixta.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/clasificacion/:id', checkPermission('clasificacion.delete'), route.clasificacion.delete);
  
  /**
   * @api {put} /clasificacion/:id ABM Cambio
   * @apiName Change
   * @apiGroup Clasificacion
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clasificacion.change
   *
   * @apiUse QueryModelId
   * @apiUse ClasificacionParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/clasificacion/:id', checkPermission('clasificacion.change'), route.clasificacion.change);

  ////////////////////////////

  //ABM Clase De Fondo
  /**
   * @apiDefine FondoQueryString
   * @apiParam (QueryString) {Integer} parent_id ID del fondo padre
   */ 

  /**
   * @apiDefine ClaseFondoParams
   * @apiParam {String} nombre Nombre
   * @apiParam {Integer} inversionMinima Inversion Minima
   * @apiParam {string{1..8}} honorarioIngreso Honorario de Ingreso (4 enteros, 4 decimales)
   * @apiParam {string{1..8}} honorarioTransferencia Honorario de Transferencia (4 enteros, 4 decimales)
   * @apiParam {string{1..8}} honorarioAdministracionGerente Honorario de Administracion Gerente (4 enteros, 4 decimales)
   * @apiParam {string{1..8}} honorarioAdministracionDepositaria Honorario de Administracion Depositaria (4 enteros, 4 decimales)
   * @apiParam {string{1..8}} gastoOrdinarioGestion Gasto Ordinario de Gestion (4 enteros, 4 decimales)
   * @apiParam {Boolean} honorarioExito Honorario Exito
   * @apiParam {Integer} monedaId Id de Moneda
   * @apiParam {Boolean} rg384 RG 384
   * @apiParam {Boolean} liquidez Es liquido
   * @apiParam {Boolean} suscripcion Suscripcion
   * @apiParam {Boolean} reexpresa Reexpresa
   * @apiParam {Boolean} nulo Nulo
   * @apiParam {Integer} tipoClaseId Id de Tipo de Clase de Fondo
   * @apiParam {String{..20}} [tickerBloomberg] Ticker Bloomberg
   */

  /**
   * @api {get} /fondo/:parent_id/clase ABM Listado
   * @apiName List
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse FondoQueryString 
   *
   * @apiUse ListSuccess
   */
  app.get('/fondo/:parent_id/clase', route.clase_fondo.list);
  
  /**
   * @api {post} /fondo/:parent_id/clase ABM Crear
   * @apiName Add
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_fondo.add
   *
   * @apiUse FondoQueryString
   * @apiUse ClaseFondoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/fondo/:parent_id/clase', checkPermission('clase_fondo.add'), route.clase_fondo.add);

  /**
   * @api {get} /fondo/:parent_id/clase/history ABM Listado Historico
   * @apiName History
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_fondo.history
   *
   * @apiUse FondoQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/fondo/:parent_id/clase/history', checkPermission('clase_fondo.history'),route.clase_fondo.log);

  /**
   * @api {get} /fondo/:parent_id/clase/:id/rendimiento/:desde/:hasta Obtener rendimiento entre fechas
   * @apiName Get
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse FondoQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/fondo/:parent_id/clase/:id/rendimiento/:desde/:hasta', route.clase_fondo.getRendimiento);

  /**
   * @api {get} /fondo/:parent_id/clase/:id/ficha Obtener ficha
   * @apiName Get
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse FondoQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/fondo/:parent_id/clase/:id/ficha', route.clase_fondo.getFicha);
  
  /**
   * @api {get} /fondo/:parent_id/clase/:id ABM Obtener
   * @apiName Get
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse FondoQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/fondo/:parent_id/clase/:id', route.clase_fondo.get);
  
  /**
   * @api {delete} /fondo/:parent_id/clase/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_fondo.delete
   *
   * @apiUse FondoQueryString
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/fondo/:parent_id/clase/:id', checkPermission('clase_fondo.delete'), route.clase_fondo.delete);
  
  /**
   * @api {put} /fondo/:parent_id/clase/:id ABM Cambio
   * @apiName Change
   * @apiGroup Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission clase_fondo.change
   *
   * @apiUse FondoQueryString
   * @apiUse QueryModelId
   * @apiUse ClaseFondoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/fondo/:parent_id/clase/:id', checkPermission('clase_fondo.change'), route.clase_fondo.change);  

  ////////////////////////////
  
  //ABM Tipo de Clase De Fondo
  /**
   * @apiDefine TipoClaseFondoParams
   * @apiParam {String} nombre Nombre 
   */

  /**
   * @api {get} /fondo/tipo-clase ABM Listado
   * @apiName List
   * @apiGroup Tipo de Clase de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/fondo/tipo-clase', route.tipo_clase_fondo.list);
  
  /**
   * @api {post} /fondo/tipo-clase ABM Crear
   * @apiName Add
   * @apiGroup Tipo de Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_clase_fondo.add
   *
   * @apiUse TipoClaseFondoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/fondo/tipo-clase', checkPermission('tipo_clase_fondo.add'), route.tipo_clase_fondo.add);

  /**
   * @api {get} /fondo/tipo-clase/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tipo de Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_clase_fondo.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/fondo/tipo-clase/history', checkPermission('tipo_clase_fondo.history'),route.tipo_clase_fondo.log);
  
  /**
   * @api {get} /fondo/tipo-clase/:id ABM Obtener
   * @apiName Get
   * @apiGroup Tipo de Clase de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/fondo/tipo-clase/:id', route.tipo_clase_fondo.get);
  
  /**
   * @api {delete} /fondo/tipo-clase/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Tipo de Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_clase_fondo.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/fondo/tipo-clase/:id', checkPermission('tipo_clase_fondo.delete'), route.tipo_clase_fondo.delete);
  
  /**
   * @api {put} /fondo/tipo-clase/:id ABM Cambio
   * @apiName Change
   * @apiGroup Tipo de Clase de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_clase_fondo.change
   *
   * @apiUse QueryModelId
   * @apiUse TipoClaseFondoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/fondo/tipo-clase/:id', checkPermission('tipo_clase_fondo.change'), route.tipo_clase_fondo.change);  

   ////////////////////////////

  //ABM Tipo de Fondo
  /**
   * @apiDefine TipoFondoParams
   * @apiParam {String} nombre Nombre 
   */

  /**
   * @api {get} /fondo/tipo-fondo ABM Listado
   * @apiName List
   * @apiGroup Tipo de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/fondo/tipo', route.tipo_fondo.list);
  
  /**
   * @api {post} /fondo/tipo-fondo ABM Crear
   * @apiName Add
   * @apiGroup Tipo de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_fondo.add
   *
   * @apiUse TipoFondoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/fondo/tipo', checkPermission('tipo_fondo.add'), route.tipo_fondo.add);

  /**
   * @api {get} /fondo/tipo-fondo/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tipo de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_fondo.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/fondo/tipo/history', checkPermission('tipo_fondo.history'),route.tipo_fondo.log);
  
  /**
   * @api {get} /fondo/tipo-fondo/:id ABM Obtener
   * @apiName Get
   * @apiGroup Tipo de Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/fondo/tipo/:id', route.tipo_fondo.get);
  
  /**
   * @api {delete} /fondo/tipo-fondo/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Tipo de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_fondo.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/fondo/tipo/:id', checkPermission('tipo_fondo.delete'), route.tipo_fondo.delete);
  
  /**
   * @api {put} /fondo/tipo-fondo/:id ABM Cambio
   * @apiName Change
   * @apiGroup Tipo de Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tipo_fondo.change
   *
   * @apiUse QueryModelId
   * @apiUse TipoFondoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/fondo/tipo/:id', checkPermission('tipo_fondo.change'), route.tipo_fondo.change);   

  ////////////////////////////

  //ABM Fondo
  /**
   * @apiDefine FondoParams
   * @apiParam {String} nombre Nombre 
   * @apiParam {String} codigoCNV Codigo CNV
   * @apiParam {String} [resolucionParticular] Resolucion Particular
   * @apiParam {Date} fechaResolucionParticular Fecha de Resolucion Particular
   * @apiParam {Date} fechaInscripcionRPC Fecha de Inscripcion RPC
   * @apiParam {Integer{1-6}} estado Estado
   * @apiParam {Integer{1-4}} [etapaLiquidacion] Etapa de Liquidacion
   * @apiParam {Integer} tipoRentaId Id de Tipo de Renta
   * @apiParam {Integer} monedaId Id de Moneda
   * @apiParam {Integer} regionId Id de Region
   * @apiParam {Integer} durationId Id de Duration
   * @apiParam {Integer} benchmarkId Id de Benchmark
   * @apiParam {Boolean} mmIndice Indice MM
   * @apiParam {Boolean} mmPuro MM Puro
   * @apiParam {String='D','M'} [valuacion] Valuacion
   * @apiParam {Boolean} ci49 CI 49
   * @apiParam {Integer} diasLiquidacion Dias de Liquidacion
   * @apiParam {Boolean} indice Indice
   * @apiParam {Integer} horizonteId Id de Horizonte
   * @apiParam {Integer} [sociedadGerenteId] Id de Entidad Sociedad Gerente
   * @apiParam {Integer} [sociedadDepositariaId] Id de Entidad Sociedad Depositaria
   * @apiParam {String='Renta Variable','Renta Mixta','Renta Fija','Plazo Fijo','De Dinero'} clasificacionVieja Vieja Clasificacion
   * @apiParam {String='<Sin Asignar>', 'Argentina', 'Latinoamerica', 'Global'} regionVieja Vieja Region
   * @apiParam {String='<Sin Asignar>', 'Corto Plazo', 'Mediano Plazo', 'Largo Plazo', 'Flexible'} horizonteViejo Viejo Horizonte
   * @apiParam {Date} inicio Fecha de Inicio
   * @apiParam {Integer} tipoFondoId Id de Tipo de Fondo
   * @apiParam {String='Clásico','Dinámico','No Aplica'} [tipoDinero] Tipo de Dinero
   * @apiParam {Integer} [tipoRentaMixtaId] Id de Tipo de Renta Mixta
   */

  /**
   * @api {get} /fondo ABM Listado
   * @apiName List
   * @apiGroup Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/fondo', route.fondo.list);

  /**
   * @api {post} /fondo ABM Crear
   * @apiName Add
   * @apiGroup Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission fondo.add
   *
   * @apiUse FondoParams
   *
   * @apiUse AddSuccess
   */
  app.post('/fondo', checkPermission('fondo.add'), route.fondo.add);

  /**
   * @api {get} /fondo/history ABM Listado Historico
   * @apiName History
   * @apiGroup Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission fondo.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/fondo/history', checkPermission('fondo.history'), route.fondo.log);

  /**
   * @api {get} /fondo/:id ABM Obtener
   * @apiName Get
   * @apiGroup Fondo
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/fondo/:id', route.fondo.get);
  
  /**
   * @api {delete} /fondo/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission fondo.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/fondo/:id', checkPermission('fondo.delete'), route.fondo.delete);
  
  /**
   * @api {put} /fondo/:id ABM Cambio
   * @apiName Change
   * @apiGroup Fondo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission fondo.change
   *
   * @apiUse QueryModelId
   * @apiUse FondoParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/fondo/:id', checkPermission('fondo.change'), route.fondo.change); 

  /////////////////////////////

  // ABM Horizonte
  /**
   * @apiDefine HorizonteParams
   * @apiParam {String} nombre Nombre 
   * @apiParam {String} codigoCNV Codigo CNV
   */

  /**
   * @api {get} /horizonte ABM Listado
   * @apiName List
   * @apiGroup Horizonte
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/horizonte', route.horizonte.list);

  /**
   * @api {post} /horizonte ABM Crear
   * @apiName Add
   * @apiGroup Horizonte
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission horizonte.add
   *
   * @apiUse HorizonteParams
   *
   * @apiUse AddSuccess
   */
  app.post('/horizonte', checkPermission('horizonte.add'), route.horizonte.add);

  /**
   * @api {get} /horizonte/history ABM Listado Historico
   * @apiName History
   * @apiGroup Horizonte
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission horizonte.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/horizonte/history', checkPermission('horizonte.history'),route.horizonte.log);

  /**
   * @api {get} /horizonte/:id ABM Obtener
   * @apiName Get
   * @apiGroup Horizonte
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/horizonte/:id', route.horizonte.get);

  /**
   * @api {delete} /horizonte/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Horizonte
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission horizonte.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/horizonte/:id', checkPermission('horizonte.delete'), route.horizonte.delete);

  /**
   * @api {put} /horizonte/:id ABM Cambio
   * @apiName Change
   * @apiGroup Horizonte
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission horizonte.change
   *
   * @apiUse QueryModelId
   * @apiUse HorizonteParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/horizonte/:id', checkPermission('horizonte.change'), route.horizonte.change);

  //////////////////////

  // ABM Composicion Benchmark
  /**
   * @apiDefine ComposicionBenchmarkParams
   * @apiParam {String} version Version 
   * @apiParam {Date} fecha Fecha
   * @apiParam {Integer} benchmarkId Id del Benchmark
   */

  /**
   * @api {get} /composicion-benchmark ABM Listado
   * @apiName List
   * @apiGroup Composicion Benchmark
   * @apiVersion 0.1.0
   *
   * @apiUse ListSuccess
   */
  app.get('/composicion-benchmark', route.composicionBenchmark.list);

  /**
   * @api {post} /composicion-benchmark ABM Crear
   * @apiName Add
   * @apiGroup Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission composicionBenchmark.add
   *
   * @apiUse ComposicionBenchmarkParams
   *
   * @apiUse AddSuccess
   */
  app.post('/composicion-benchmark', checkPermission('composicionBenchmark.add'), route.composicionBenchmark.add);

  /**
   * @api {get} /composicion-benchmark/history ABM Listado Historico
   * @apiName History
   * @apiGroup Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission composicionBenchmark.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/composicion-benchmark/history', checkPermission('composicionBenchmark.history'),route.composicionBenchmark.log);

  /**
   * @api {get} /composicion-benchmark/:id ABM Obtener
   * @apiName Get
   * @apiGroup Composicion Benchmark
   * @apiVersion 0.1.0
   *
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/composicion-benchmark/:id', route.composicionBenchmark.get);

  /**
   * @api {delete} /composicion-benchmark/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission composicionBenchmark.delete
   *
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/composicion-benchmark/:id', checkPermission('composicionBenchmark.delete'), route.composicionBenchmark.delete);

  /**
   * @api {put} /composicion-benchmark/:id ABM Cambio
   * @apiName Change
   * @apiGroup Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission composicionBenchmark.change
   *
   * @apiUse QueryModelId
   * @apiUse ComposicionBenchmarkParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/composicion-benchmark/:id', checkPermission('composicionBenchmark.change'), route.composicionBenchmark.change);

  ////////////////////////////////////

  // ABM Item Composicion Benchmark
  /**
   * @apiDefine ComposicionBenchmarkQueryString
   * @apiParam (QueryString) {Integer} parent_id ID de la Composicion Benchmark madre
   */ 

  /**
   * @apiDefine ItemComposicionBenchmarkParams
   * @apiParam {string{1..6}} porcentaje Porcentaje (3 enteros, 3 decimales)
   * @apiParam {Integer} tickerId Id de Ticker
   */

  /**
   * @api {get} /composicion-benchmark/:parent_id/item ABM Listado
   * @apiName List
   * @apiGroup Item Composicion Benchmark
   * @apiVersion 0.1.0
   *
   * @apiUse ComposicionBenchmarkQueryString 
   *
   * @apiUse ListSuccess
   */
  app.get('/composicion-benchmark/:parent_id/item', route.itemComposicionBenchmark.list);

  /**
   * @api {post} /composicion-benchmark/:parent_id/item ABM Crear
   * @apiName Add
   * @apiGroup Item Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission itemComposicionBenchmark.add
   *
   * @apiUse ComposicionBenchmarkQueryString
   * @apiUse ItemComposicionBenchmarkParams
   *
   * @apiUse AddSuccess
   */
  app.post('/composicion-benchmark/:parent_id/item', checkPermission('itemComposicionBenchmark.add'), route.itemComposicionBenchmark.add);

  /**
   * @api {get} /composicion-benchmark/:parent_id/item/history ABM Listado Historico
   * @apiName History
   * @apiGroup Item Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission itemComposicionBenchmark.history
   *
   * @apiUse ComposicionBenchmarkQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/composicion-benchmark/:parent_id/item/history', checkPermission('itemComposicionBenchmark.history'), route.itemComposicionBenchmark.log);

  /*
   * @api {get} /composicion-benchmark/:parent_id/item/:id ABM Obtener
   * @apiName Get
   * @apiGroup Item Composicion Benchmark
   * @apiVersion 0.1.0
   *
   * @apiUse ComposicionBenchmarkQueryString
   * @apiUse QueryModelId
   *
   * @apiUse GetSuccess
   */
  app.get('/composicion-benchmark/:parent_id/item/:id', route.itemComposicionBenchmark.get);

  /**
   * @api {delete} /composicion-benchmark/:parent_id/item/:id ABM Borrar
   * @apiName Delete
   * @apiGroup Item Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission itemComposicionBenchmark.delete
   *
   * @apiUse ComposicionBenchmarkQueryString
   * @apiUse QueryModelId
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/composicion-benchmark/:parent_id/item/:id', checkPermission('itemComposicionBenchmark.delete'), route.itemComposicionBenchmark.delete);

  /**
   * @api {put} /composicion-benchmark/:parent_id/item/:id ABM Cambio
   * @apiName Change
   * @apiGroup Item Composicion Benchmark
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission itemComposicionBenchmark.change
   *
   * @apiUse ComposicionBenchmarkQueryString
   * @apiUse QueryModelId
   * @apiUse ItemComposicionBenchmarkParams
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/composicion-benchmark/:parent_id/item/:id', checkPermission('itemComposicionBenchmark.change'), route.itemComposicionBenchmark.change);

  //////////////////////

  //ABM Alias Calificadora
  /**
   * @api {get} /calificadora/alias ABM Listado
   * @apiName List
   * @apiGroup Alias Calificadora
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasCalificadora.list
   *
   * @apiUse ListSuccess
   */
  app.get('/calificadora/alias', checkPermission('aliasCalificadora.list'), route.aliasCalificadora.list);
  
  /**
   * @api {post} /calificadora/alias ABM Crear
   * @apiName Add
   * @apiGroup Alias Calificadora
   * @apiVersion 0.1.0
   * @apiDescription Toma la entidadId de la entidad asociada al usuario
   * @apiUse HeaderAuthorization
   * @apiPermission aliasCalificadora.add
   *
   * @apiParam {Integer} calificadoraId Id de la entidad Calificadora
   * @apiParam {String} aliasInterno alias
   *
   * @apiUse AddSuccess
   */
  app.post('/calificadora/alias', checkPermission('aliasCalificadora.add'), route.aliasCalificadora.add);
  
  /**
   * @api {get} /calificadora/alias/history ABM Listado Historico
   * @apiName History
   * @apiGroup Alias Calificadora
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasCalificadora.history
   *
   * @apiUse HistorySuccess
   */
  app.get('/calificadora/alias/history', checkPermission('aliasCalificadora.history'), route.aliasCalificadora.log);
  
  /**
   * @api {delete} /calificadora/:id/alias ABM Borrar
   * @apiName Delete
   * @apiGroup Alias Calificadora
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasCalificadora.delete
   *
   * @apiParam (QueryString) {Integer} id ID de la entidad Calificadora
   *
   * @apiUse DeleteSuccess
   */
  app.delete('/calificadora/:id/alias', checkPermission('aliasCalificadora.delete'), route.aliasCalificadora.delete);
  
  /**
   * @api {put} /calificadora/:id/alias ABM Cambio
   * @apiName Change
   * @apiGroup Alias Calificadora
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission aliasCalificadora.change
   *
   * @apiParam (QueryString) {Integer} id ID de la entidad Calificadora
   * @apiParam {String} aliasInterno alias
   * @apiUse ChangeUpdatedAt
   *
   * @apiUse ChangeSuccess
   */
  app.put('/calificadora/:id/alias', checkPermission('aliasCalificadora.change'), route.aliasCalificadora.change);

  ////////////////////////////////
  
  // LLamadas de Interfaces

  /**
   * @apiDefine FechaDatosQueryString
   * @apiParam (QueryString) {String} fecha Fecha de los datos ('YYYY-MM-DD')
   */ 

  // TODO: Poner ejemplos de json

  /**
   * @api {post} /interfaz/diaria/json/to/xml Json a XML
   * @apiName jsonToXml
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un json posteado a un archivo xml que se descarga
   */
  app.post('/interfaz/diaria/json/to/xml', route.interfazDiaria.jsonToXml);
  /**
   * @api {post} /interfaz/diaria/json/to/xml XML a Json
   * @apiName xmlToJson
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un archivo xml posteado a formato json
   */
  app.post('/interfaz/diaria/xml/to/json', route.interfazDiaria.xmlToJson);

  /**
   * @api {post} /interfaz/diaria/completar Completar JSON
   * @apiName completar
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Completa el json
   * 
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data json completado.
   */
  app.post('/interfaz/diaria/completar',checkPermission('interfazDiaria.completar'), route.interfazDiaria.completar);

  /**
   * @api {post} /interfaz/diaria/guardar Guardar JSON
   * @apiName guardar
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Procesa y guarda el xml
   *
   * @apiParam {String} file Contenido del xml
   * @apiParam {String} fileName Nombre del xml
   * @apiParam {String} sign Hash generado con la clave privada
   * 
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.post('/interfaz/diaria/guardar',checkPermission('interfazDiaria.guardar'), route.interfazDiaria.guardar);

  /**
   * @api {get} /interfaz/diaria/recibo/:externalId Recibo
   * @apiName Interfaz Diaria
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Envia el recibo de envio
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.get('/interfaz/diaria/recibo/:externalId', route.interfazDiaria.recibo);

  /**
   * @api {get} /interfaz/diaria/agen/:fecha/detalle Detalle AGEN
   * @apiName agen
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission interfazDiaria.agen
   * @apiDescription Indica la fecha en la que se genero el reporte mas reciente para la fecha indicada.
   *
   * @apiUse FechaDatosQueryString
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data
   */
  app.get('/interfaz/diaria/agen/:fecha/detalle',checkPermission('interfazDiaria.agen'), route.interfazDiaria.agenDetalle);

  /**
   * @api {get} /interfaz/diaria/reportes Reportes diarios
   * @apiName agen
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Devuelve un objeto con todos los reportes diarios, separado por fecha
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data  Devuelve el objeto, con las fechas como clave, y los reportes como valor.
   */
  app.get('/interfaz/diaria/reportes',checkPermission('interfazDiaria.reportesDiarios'), route.interfazDiaria.reportesDiarios);

  /**
   * @api {get} /interfaz/diarios/* Reportes
   * @apiName reportes
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Descargar un reporte
   */
  app.get('/'+settings.reportesPath+settings.folderDiarias+'*', downloadCheckPermission('interfazDiaria.reportesDiarios'));
  
  /**
   * @api {post} /interfaz/semanal/json/to/xml Json a XML
   * @apiName jsonToXml
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un json posteado a un archivo xml que se descarga
   */
  app.post('/interfaz/semanal/json/to/xml', route.interfazSemanal.jsonToXml);

  /**
   * @api {post} /interfaz/semanal/json/to/xml XML a Json
   * @apiName xmlToJson
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un archivo xml posteado a formato json
   */
  app.post('/interfaz/semanal/xml/to/json', route.interfazSemanal.xmlToJson);

  /**
   * @api {post} /interfaz/semanal/completar Completar JSON
   * @apiName completar
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Completa el json
   * 
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data json completado.
   */
  app.post('/interfaz/semanal/completar',checkPermission('interfazSemanal.completar'), route.interfazSemanal.completar);

  /**
   * @api {post} /interfaz/semanal/guardar Guardar JSON
   * @apiName guardar
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Procesa y guarda el xml
   *
   * @apiParam {String} file Contenido del xml
   * @apiParam {String} fileName Nombre del xml
   * @apiParam {String} sign Hash generado con la clave privada
   * 
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.post('/interfaz/semanal/guardar',checkPermission('interfazSemanal.guardar'), route.interfazSemanal.guardar);

  /**
   * @api {get} /interfaz/semanal/limites/:externalId Limites Semanales
   * @apiName Interfaz Semanal
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Realiza el control de limites para la interfaz 
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} excepciones Un objeto donde la clave es el numero de regla, y un objeto indicando si hay excepcion y los datos del reporte
   */
  app.get('/interfaz/semanal/limites/:externalId',checkPermission('interfazSemanal.limites'), route.interfazSemanal.limites);

  /**
   * @api {get} /interfaz/semanal/recibo/:externalId Recibo
   * @apiName Interfaz Semanal
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Envia el recibo de envio
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.get('/interfaz/semanal/recibo/:externalId', route.interfazSemanal.recibo);
  // app.get('/interfaz/semanal/recibo/:id',checkPermission('interfazSemanal.limites'), route.interfazSemanal.recibo);

  /**
   * @api {get} /interfaz/semanal/reportes/:fecha/detalle Detalle AGEN
   * @apiName Detalle Reporte
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission interfazSemanal.reportes
   * @apiDescription Indica la fecha en la que se genero el reporte mas reciente para la fecha indicada.
   *
   * @apiUse FechaDatosQueryString
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data
   */
  app.get('/interfaz/semanal/reportes/:fecha/detalle',checkPermission('interfazSemanal.reportes'), route.interfazSemanal.reportesDetalle);

  /**
   * @api {get} /interfaz/semanal/reportes Listar Reportes
   * @apiName Listar Reportes
   * @apiGroup Interfaz Diaria
   * @apiVersion 0.1.0
   *
   * @apiDescription Devuelve un objeto con todos los reportes semanales, separados por fecha
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data  Devuelve el objeto, con las fechas como clave, y los reportes como valor.
   */
  app.get('/interfaz/semanal/reportes',checkPermission('interfazSemanal.reportes'), route.interfazSemanal.reportesSemanales);

  /**
   * @api {get} /interfaz/semanal/* Reportes
   * @apiName reportes
   * @apiGroup Interfaz Semanal
   * @apiVersion 0.1.0
   *
   * @apiDescription Descargar un reporte
   */
  app.get('/'+settings.reportesPath+settings.folderSemanales+'*', downloadCheckPermission('interfazSemanal.reportes'));

  /**
   * @api {post} /interfaz/mensual/json/to/xml Json a XML
   * @apiName jsonToXml
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un json posteado a un archivo xml que se descarga
   */
  app.post('/interfaz/mensual/json/to/xml', route.interfazMensual.jsonToXml);
  /**
   * @api {post} /interfaz/mensual/json/to/xml XML a Json
   * @apiName xmlToJson
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un archivo xml posteado a formato json
   */
  app.post('/interfaz/mensual/xml/to/json', route.interfazMensual.xmlToJson);

  /**
   * @api {post} /interfaz/mensual/completar Completar JSON
   * @apiName completar
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Completa el json
   * 
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data json completado.
   */
  app.post('/interfaz/mensual/completar',checkPermission('interfazMensual.completar'), route.interfazMensual.completar);

  /**
   * @api {post} /interfaz/mensual/guardar Guardar JSON
   * @apiName guardar
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Procesa y guarda el xml
   *
   * @apiParam {String} file Contenido del xml
   * @apiParam {String} fileName Nombre del xml
   * @apiParam {String} sign Hash generado con la clave privada
   * 
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.post('/interfaz/mensual/guardar',checkPermission('interfazMensual.guardar'), route.interfazMensual.guardar);

  /**
   * @api {get} /interfaz/mensual/recibo/:externalId Recibo
   * @apiName Interfaz Mensual
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Envia el recibo de envio
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   */
  app.get('/interfaz/mensual/recibo/:externalId', route.interfazMensual.recibo);

  /**
   * @api {get} /interfaz/mensual/reportes/:fecha/detalle Detalle Mensual
   * @apiName Detalle Reporte
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission interfazMensual.reportes
   * @apiDescription Indica la fecha en la que se genero el reporte mas reciente para la fecha indicada.
   *
   * @apiUse FechaDatosQueryString
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data
   */
  app.get('/interfaz/mensual/reportes/:fecha/detalle',checkPermission('interfazMensual.reportes'), route.interfazMensual.reportesDetalle);

  /**
   * @api {get} /interfaz/mensual/reportes Listar Reportes
   * @apiName Listar Reportes
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Devuelve un objeto con todos los reportes mensuales, separados por fecha
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data  Devuelve el objeto, con las fechas como clave, y los reportes como valor.
   */
  app.get('/interfaz/mensual/reportes',checkPermission('interfazMensual.reportes'), route.interfazMensual.reportesMensuales);

    /**
   * @api {get} /interfaz/mensual/* Reportes
   * @apiName reportes
   * @apiGroup Interfaz Mensual
   * @apiVersion 0.1.0
   *
   * @apiDescription Descargar un reporte
   */
  app.get('/'+settings.reportesPath+settings.folderMensuales+'/*', downloadCheckPermission('interfazMensual.reportes'));  

  /**
   * @api {post} /interfaz/cierre Listar zips de cierre
   * @apiName listar cierres
   * @apiGroup Interfaz
   * @apiVersion 0.1.0
   *
   * @apiDescription Devuelve el listado de cierres
   */
  app.get('/interfaz/cierre/list',checkPermission('interfaz.descargarCierre'), route.interfaz.cierreList);

  /**
   * @api {get} /interfaz/cierre/detalle Detalle Cierre
   * @apiName Detalle Cierre
   * @apiGroup Interfaz
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission interfaz.cierre
   * @apiDescription Indica la fecha en la que se genero ultimo cierre
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data
   */
  app.get('/interfaz/cierre/detalle',checkPermission('interfaz.cierre'), route.interfaz.cierreDetalle);
  
  /**
   * @api {post} /interfaz/cierre/:desde/:hasta Generar zip de cierre
   * @apiName generar cierre
   * @apiGroup Interfaz
   * @apiVersion 0.1.0
   *
   * @apiDescription Genera el cierre, y devuelve la url para descargarlo
   */
  app.get('/interfaz/cierre/:desde/:hasta',checkPermission('interfaz.cierre'), route.interfaz.cierre);

  /**
   * @api {get} /cierre/descarga/* Descarga de zip de cierre
   * @apiName descarga cierre
   * @apiGroup Interfaz
   * @apiVersion 0.1.0
   *
   * @apiDescription Descargar el cierre
   */
  app.get('/'+settings.cierrePath+'*', downloadCheckPermission('interfaz.descargarCierre'));

  //////////////////

  // ABM Balance Entidad
  /**
   * @api {get} /balance-entidad ABM Listado
   * @apiName List
   * @apiGroup Balance Entidad
   * @apiVersion 0.1.0
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data  Devuelve el listado de todas los balances.
   */
  app.get('/balance-entidad', route.balanceEntidad.list);

  /**
   * @api {post} /balance-entidad ABM Crear
   * @apiName Add
   * @apiGroup Balance Entidad
   * @apiVersion 0.1.0
   *
   * @apiParam {String(90)} entidad Nombre de la Entidad.
   * @apiParam {String(255)} codigoEntidad Codigo CNV de la Entidad
   * @apiParam {Date} fecha Fecha del Balance
   * @apiParam {String(10)} tipo Tipo del balance
   * @apiParam {String(14)} cuenta Tipo del dato sobre el que se hace el balance
   * @apiParam {String} monto Cantidad de "cuenta" actual. (19 digitos enteros, 0 digitos decimales)
   * @apiParam {String} entidadId Id de una entidad existente. Opcional
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Moneda creada.
   */
  app.post('/balance-entidad', checkPermission('balanceEntidad.add'), route.balanceEntidad.add);

  /**
   * @api {get} /balance-entidad/history ABM Listado Historico
   * @apiName History
   * @apiGroup Balance Entidad
   * @apiVersion 0.1.0
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object[]} data  Devuelve el listado de todos los cambios en los balances.
   */
  app.get('/balance-entidad/history',  checkPermission('balanceEntidad.history'), route.balanceEntidad.log);

  /**
   * @api {get} /balance-entidad/:id ABM Obtener
   * @apiName Get
   * @apiGroup Balance Entidad
   * @apiVersion 0.1.0
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Devuelve el balance si existe.
   */
  app.get('/balance-entidad/:id', route.balanceEntidad.get);

  /**
   * @api {post} /balance-entidad/xml/to/json XML a Json
   * @apiName xmlToJson
   * @apiGroup Balance Entidad
   * @apiVersion 0.1.0
   *
   * @apiDescription Convierte un archivo xml posteado a formato json
   */
  app.post('/balance-entidad/xml/to/json', route.balanceEntidad.xmlToJson);

  //////////////////

  // ABM Cotizacion Mae
  /**
   * @api {get} /cotizacion-mae ABM Listado
   * @apiName List
   * @apiGroup Cotizacion Mae
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMae.list
   *
   * @apiUse ListSuccess
   */
  app.get('/cotizacion-mae', checkPermission('cotizacionMae.list'), route.cotizacionMae.list);

  /**
   * @api {post} /cotizacion-mae ABM Crear
   * @apiName Add
   * @apiGroup Cotizacion Mae
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMae.add
   *
   * @apiParam {Date} fecha fecha de las cotizaciones mae a crear.
   * @apiParam {Object[]} cotizaciones array con las cotizaciones mae a crear.
   * @apiParam {String} cotizaciones.mercado
   * @apiParam {String} cotizaciones.negociacion 
   * @apiParam {String} cotizaciones.clase
   * @apiParam {String} cotizaciones.titulo
   * @apiParam {String} cotizaciones.cantidadNegociada 
   * @apiParam {String} cotizaciones.montoNegociado
   * @apiParam {String} cotizaciones.promedio
   * @apiParam {String} cotizaciones.anterior       
   * @apiParam {String} cotizaciones.ultimo          
   * @apiParam {String} cotizaciones.minimo               
   * @apiParam {String} cotizaciones.maximo               
   * @apiParam {String} cotizaciones.tipoPrecio
   * @apiParam {String} cotizaciones.filler                       
   * @apiParam {Object} cotizaciones.tickerId    
   *
   * @apiUse AddSuccess
   */
  app.post('/cotizacion-mae', checkPermission('cotizacionMae.add'), route.cotizacionMae.add);

  /**
   * @api {get} /cotizacion-mae/:id ABM Obtener
   * @apiName Get
   * @apiGroup CotizacionMae
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMae.get
   *
   * @apiUse HistorySuccess
   */
  app.get('/cotizacion-mae/:id', checkPermission('cotizacionMae.get'), route.cotizacionMae.get);  

  /**
   * @api {get} /cotizacion-mae/parse ABM Parsear
   * @apiName Post
   * @apiGroup CotizacionMae
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMae.parse
   *
   * @apiSuccess {Boolean} success Indica que no hubo problemas.
   * @apiSuccess {Object} data Devuelve el archivo parseado.
   */
  app.post('/cotizacion-mae/parse', checkPermission('cotizacionMae.parse'), route.cotizacionMae.parse);  

  /**
   * @api {get} /cotizacion-mae/reporte-txt ABM Reporte Txt
   * @apiName Get
   * @apiGroup CotizacionMae
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMae.getTxt
   *
   * @apiDescription Descargar el reporte MAE en formato txt
   */
  app.get('/cotizacion-mae/reporte-txt/:fecha', downloadCheckPermission('cotizacionMae.getTxt'), route.cotizacionMae.reporteTxt);    

  /**
   * @api {get} /cotizacion-mae/reporte-xlsx ABM Reporte Xlsx
   * @apiName Get
   * @apiGroup CotizacionMae
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission cotizacionMae.getXlsx
   *
   * @apiDescription Descargar el reporte MAE en formato xlsx
   */
    app.get('/cotizacion-mae/reporte-xlsx/:fecha', downloadCheckPermission('cotizacionMae.getXlsx'), route.cotizacionMae.reporteXlsx); 


  /**
   * @api {get} /activo/:id/tasa Listar Tasas correspondiente a un activo
   * @apiName Get
   * @apiGroup Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tasa_activo.list
   *
   * @apiDescription Descargar el reporte MAE en formato xlsx
   */
    app.get('/activo/:parent_id/tasa',  route.tasaActivo.list);

 /**
   * @api {get} /activo/:id/tasa Agregar Tasa a un Activo
   * @apiName Post
   * @apiGroup Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tasa_activo.add
   *
   * @apiDescription Agregar Tasa a un Activo
   */
    app.post('/activo/:parent_id/tasa', checkPermission('tasa_activo.add'), route.tasaActivo.add);

  /**
   * @api {put} /activo/:parent_id/ticker/:id ABM Cambio Tasa Activo
   * @apiName Change
   * @apiGroup Tasa Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tasa_activo.change
   *
   * @apiUse ActivoQueryString
   * @apiUse QueryModelId
   * @apiUse TasaParams
   *
   * @apiUse ChangeSuccess
   */
  app.put('/activo/:parent_id/tasa/:id', checkPermission('tasa_activo.change'), route.tasaActivo.change);


    /**
   * @api {get} /activo/:parent_id/ticker/history ABM Listado Historico
   * @apiName History
   * @apiGroup Tasa Activo
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission tasa_activo.history
   *
   * @apiUse ActivoQueryString 
   *
   * @apiUse HistorySuccess
   */
  app.get('/activo/:parent_id/tasa/history', checkPermission('tasa_activo.history'), route.tasaActivo.log);

  /**
   * @api {post} /filtro-reporte Subfiltros Reporte
   * @apiName Post
   * @apiGroup Filtro Reporte
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission filtro_reporte.subfiltro
   *
   * @apiDescription Obtener subfiltros para un conjunto de filtros.
   */
    app.post('/filtro-reporte/subfiltro', checkPermission('filtro_reporte.subfiltro'), route.filtroReporte.subfiltro);
    
  /**
   * @api {post} /filtro-reporte Obtener Reportes
   * @apiName Post
   * @apiGroup Filtro Reporte
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission filtro_reporte.obtenerReportes
   *
   * @apiDescription Listado de reportes.
   */
    app.post('/filtro-reporte', checkPermission('filtro_reporte.obtenerReportes'), route.filtroReporte.obtenerReportes);

  /**
   * @api {post} /filtro-informe Subfiltros Informe
   * @apiName Post
   * @apiGroup Filtro Informe
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission filtro_informe.subfiltro
   *
   * @apiDescription Obtener subfiltros para un conjunto de filtros.
   */
    app.post('/filtro-informe/folders',checkPermission('filtro_informe.folders'), route.filtroInforme.folders);
    
  /**
   * @api {post} /filtro-informe Obtener Informes
   * @apiName Post
   * @apiGroup Filtro Informe
   * @apiVersion 0.1.0
   * @apiUse HeaderAuthorization
   * @apiPermission filtro_informe.obtenerInformes
   *
   * @apiDescription Listado de Informes.
   */
    app.post('/filtro-informe',checkPermission('filtro_informe.obtenerInformes'), route.filtroInforme.obtenerInformes);

  /**
   * @api {get} /informes/* Informes
   * @apiName informes
   * @apiGroup Informes
   * @apiVersion 0.1.0
   *
   * @apiDescription Descargar un informe
   */
  app.get('/'+settings.informesPath+'*', downloadCheckPermission('filtro_informe.obtenerInformes'));
    
};
