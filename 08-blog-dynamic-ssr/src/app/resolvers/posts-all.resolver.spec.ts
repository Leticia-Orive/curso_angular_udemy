import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postsAllResolver } from './posts-all.resolver';

describe('postsAllResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postsAllResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
