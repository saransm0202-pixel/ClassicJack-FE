import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EstimateFormModel, EnquiryResult } from '../models/estimate-form.model';

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/EnquiryAPI`;

  submitEnquiry(payload: EstimateFormModel): Observable<EnquiryResult> {
    return this.http.post<EnquiryResult>(`${this.base}/SubmitConsultation`, {
      accountId: environment.accountId,
      ...payload,
    });
  }
}