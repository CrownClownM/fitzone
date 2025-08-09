import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '@auth/services/auth.service';
import {
  FitnessCenter,
  FitnessClass,
} from '@home/interfaces/class-store.interface';
import { ClassStoreService } from '@home/services/class-store.service';
import { ClassCardComponent } from '@shared/components/class-card/class-card.component';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-gym-classes',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ClassCardComponent,
    MatChipsModule,
    NgTemplateOutlet,
    MatSelectModule,
  ],
  templateUrl: './gym-classes.component.html',
  styleUrl: './gym-classes.component.scss',
})
export class GymClassesComponent implements OnInit, OnDestroy {
  showFilters = false;
  filterForm: FormGroup;
  searchTerm: FormControl;
  centers: FitnessCenter[] = [];
  filteredClasses: FitnessClass[] = [];

  categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'crossfit', label: 'CrossFit' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'spinning', label: 'Spinning' },
    { value: 'pilates', label: 'Pilates' },
    { value: 'boxing', label: 'Boxing' },
    { value: 'functional', label: 'Funcional' },
  ];

  intensities = [
    { value: '', label: 'Todos los niveles' },
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
  ];

  /**
   * Obtiene la etiqueta de la categoría seleccionada
   */
  getCategoryLabel(): string {
    const value = this.filterForm?.value?.category;
    const found = this.categories?.find((c: any) => c.value === value);
    return found ? found.label : '';
  }

  /**
   * Obtiene la etiqueta de la intensidad seleccionada
   */
  getIntensityLabel(): string {
    const value = this.filterForm?.value?.intensity;
    const found = this.intensities?.find((i: any) => i.value === value);
    return found ? found.label : '';
  }

  /**
   * Obtiene el nombre del centro seleccionado
   */
  getCenterName(): string {
    const value = this.filterForm?.value?.centerId;
    const found = this.centers?.find((c: any) => c.id === value);
    return found ? found.name : '';
  }
  private _classService = inject(ClassStoreService);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  private _fb = inject(FormBuilder);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _lastCenterId: string | null | undefined;
  private _destroy$ = new Subject<void>();

  constructor() {
    this.filterForm = this._initializeFilterForm();
    this.searchTerm = this._initilizeSearchInput();
    this._initializeReactivity();
  }

  /**
   * Inicializar el campo de búsqueda
   */
  private _initilizeSearchInput(): FormControl {
    return this._fb.control('');
  }

  /**
   * Inicializar el formulario de filtros
   */
  private _initializeFilterForm(): FormGroup {
    return (this.filterForm = this._fb.group({
      category: [''],
      intensity: [''],
      centerId: [''],
    }));
  }

  /**
   * Inicializar reactividad en el formulario de filtros
   */
  private _initializeReactivity(): void {
    this.filterForm.valueChanges.subscribe((filters) => {
      this._classService.selectedFilters.set(filters);

      // Sincronizar centerId con los query params de la URL
      if (filters.centerId !== this._lastCenterId) {
        this._lastCenterId = filters.centerId;
        // Navegar manteniendo otros posibles query params
        this._router.navigate([], {
          relativeTo: this._route,
          queryParams: {
            centerId: filters.centerId || null, // null elimina el param
          },
          queryParamsHandling: 'merge',
          replaceUrl: true, // Evita crecer el historial del navegador
        });
      }
    });

    this.searchTerm.valueChanges.subscribe((value) => {
      this._classService.searchTerm.set(value || '');
    });

    effect(() => {
      this.filteredClasses = this._classService.filteredClasses();
    });
  }

  ngOnInit() {
    this.centers = this._classService.centers();
    this._initializeDefaultValues();
    this._applyCenterIdFromQueryParam();
    this._listenToQueryParamChanges();
  }

  /*
   * Inicializar signals con los valores actuales del formulario
   */
  private _initializeDefaultValues(): void {
    this._classService.selectedFilters.set(this.filterForm.value);
    this._classService.searchTerm.set(this.searchTerm.value || '');
    this.filteredClasses = this._classService.filteredClasses();
  }

  /**
   * Lee el query param centerId (si existe) y aplica el filtro correspondiente
   */
  private _applyCenterIdFromQueryParam(): void {
    const centerId = this._route.snapshot.queryParamMap.get('centerId');
    if (centerId) {
      // Guardar para evitar navegación redundante inmediata
      this._lastCenterId = centerId;
      // Solo parchear si es diferente al valor actual del formulario
      if (this.filterForm.value.centerId !== centerId) {
        this.filterForm.patchValue({ centerId }, { emitEvent: true });
      }
    }
  }

  /**
   * Escucha cambios posteriores de query params para sincronizar centerId
   */
  private _listenToQueryParamChanges(): void {
    this._route.queryParamMap
      .pipe(takeUntil(this._destroy$))
      .subscribe((params) => {
        const centerId = params.get('centerId') || '';
        // Evitar ciclos si el valor coincide con el último propagado
        if (centerId === (this.filterForm.value.centerId || '')) return;
        this._lastCenterId = centerId;
        this.filterForm.patchValue({ centerId }, { emitEvent: true });
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /*
   * Limpia los filtros y campo de busqueda
   */
  clearFilters() {
    this.filterForm.reset({ category: '', intensity: '', centerId: '' });
    this.searchTerm.setValue('');
  }

  /*
   * Maneja la reserva de la clase
   */
  handleReserveClass(classId: string) {
    if (!this._authService.isAuthenticated()) {
      this._toastService.showInfo(
        'Debes iniciar sesión para reservar una clase.'
      );
      return;
    }

    const success = this._classService.bookClass(classId);

    if (success) {
      this._toastService.showSuccess(
        'Tu clase ha sido reservada exitosamente.'
      );
    }
  }

  /**
   * Verifica si hay filtros activos
   */
  hasActiveFilters(): boolean {
    const { category, intensity, centerId } = this.filterForm.value;
    return !!(category || intensity || centerId || this.searchTerm.value);
  }
}
