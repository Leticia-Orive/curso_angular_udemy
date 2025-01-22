import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postsCategoryResolver } from './posts-category.resolver';

describe('postsCategoryResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postsCategoryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
