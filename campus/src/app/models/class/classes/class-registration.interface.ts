import { Registration } from '../../enums/role.enums';

export interface CreateClassRegistrationDto {
  class_reporting_date: String;
  class_registration_status: Registration;
}
