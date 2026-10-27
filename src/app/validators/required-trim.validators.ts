import { AbstractControl, ValidationErrors } from "@angular/forms";

export function requiredTrim(
    control:AbstractControl
): ValidationErrors | null {

    const value = control.value;

    if(typeof value === 'string' && value.trim().length === 0){
        return { required : true}
    }

    return null;
}