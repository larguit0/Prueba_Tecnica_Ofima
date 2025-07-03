import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { DatePipe } from '@angular/common'; 
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  standalone: true,
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    DatePipe
  ]
})
export class EmpleadoComponent {

  empleados: Empleado[] = [];
  empleado: Empleado = {
    nombre: '',
    correo: '',
    cargo: '',
    departamento: '',
    telefono: '',
    fecha: '',
    activo: true
  };

  editando: boolean = false;

  constructor(private empleadoService: EmpleadoService) {
    this.cargarEmpleados();
  }

  // Carga todos los empleados al iniciar
  cargarEmpleados() {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  // Guarda o actualiza un empleado
  guardarEmpleado() {
    if (!this.empleado.nombre || !this.empleado.correo) {
      this.mostrarMensaje('Nombre y correo son obligatorios.', 'error');
      return;
    }

    if (!this.validarEmail(this.empleado.correo)) {
      this.mostrarMensaje('Correo inválido.', 'error');
      return;
    }

    if (this.empleado.fecha && new Date(this.empleado.fecha) > new Date()) {
      this.mostrarMensaje('La fecha no puede ser en el futuro.', 'error');
      return;
    }

    if (this.editando && this.empleado.id) {
      this.empleadoService.actualizarEmpleado(this.empleado.id, this.empleado).subscribe(() => {
        this.mostrarMensaje('Empleado actualizado con éxito.', 'exito');
        this.resetearFormulario();
        this.cargarEmpleados();
      });
    } else {
      this.empleadoService.crearEmpleado(this.empleado).subscribe(() => {
        this.mostrarMensaje('Empleado creado con éxito.', 'exito');
        this.resetearFormulario();
        this.cargarEmpleados();
      });
    }
  }

  // Carga los datos del empleado en el formulario para editar
  editarEmpleado(emp: Empleado) {
  this.empleado = {
    ...emp,
    fecha: emp.fecha ? emp.fecha.split('T')[0] : ''
  };
  this.editando = true;
}

  // Elimina un empleado
  eliminarEmpleado(id: number | undefined) {
    if (!id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al empleado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe(() => {
          this.mostrarMensaje('Empleado eliminado con éxito.', 'exito');
          this.cargarEmpleados();
        });
      }
    });
  }

  // Validación básica de email
  validarEmail(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  // Muestra un toast con SweetAlert2
  mostrarMensaje(msg: string, tipo: 'exito' | 'error') {
    Swal.fire({
      icon: tipo === 'exito' ? 'success' : 'error',
      title: tipo === 'exito' ? '¡Éxito!' : '¡Error!',
      text: msg,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
    });
  }

  // Limpia el formulario
  resetearFormulario() {
    this.empleado = {
      nombre: '',
      correo: '',
      cargo: '',
      departamento: '',
      telefono: '',
      fecha: '',
      activo: true
    };
    this.editando = false;
  }
}
