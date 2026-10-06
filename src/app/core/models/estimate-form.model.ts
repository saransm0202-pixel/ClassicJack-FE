export interface EstimateFormModel {
  name: string;
  phone: string;
  email: string;
  plotLocation: string;
  plotArea: string;
  package: string;
  message: string;
}

export const EMPTY_ESTIMATE: EstimateFormModel = {
  name: '',
  phone: '',
  email: '',
  plotLocation: '',
  plotArea: '',
  package: '',
  message: '',
};

export interface EnquiryResult {
  success: boolean;
  message: string;
}