import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface EmailRequest {
  senderEmail: string;
  message: string;
  subject?: string;
  recipientEmail?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = '/api/send-email'; // Cambiar según tu backend
  private defaultRecipient = 'contacto@rlpsoftwarefactory.com';

  constructor(private http: HttpClient) {}

  sendContactEmail(request: EmailRequest): Observable<EmailResponse> {
    const payload = {
      to: request.recipientEmail || this.defaultRecipient,
      from: request.senderEmail,
      replyTo: request.senderEmail,
      subject: request.subject || 'RLP Software Factory - Solicitud de Auditoría',
      message: request.message,
      timestamp: new Date().toISOString(),
    };

    return this.http.post<EmailResponse>(this.apiUrl, {
      ...payload,
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error al enviar el mensaje';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = error.error.message;
    } else {
      // Error del servidor
      errorMessage = error.status === 0 
        ? 'No se pudo conectar con el servidor'
        : `Error ${error.status}: ${error.statusText}`;
    }
    
    console.error('Email Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
