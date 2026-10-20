import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAssetFile } from './upload-asset-file';

describe('UploadAssetFile', () => {
  let component: UploadAssetFile;
  let fixture: ComponentFixture<UploadAssetFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAssetFile],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAssetFile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
