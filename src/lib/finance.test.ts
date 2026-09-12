import { describe, expect, it } from 'vitest';
import { historicalUsd, marketCap, percentageChange } from './finance';

describe('financial calculations',()=>{
  it('uses the historical FX observation',()=>expect(historicalUsd(100,20)).toBe(5));
  it('rejects missing or invalid FX',()=>expect(historicalUsd(100,0)).toBeUndefined());
  it('calculates market cap only with valid inputs',()=>expect(marketCap(25,4)).toBe(100));
  it('calculates percentage change',()=>expect(percentageChange(110,100)).toBe(10));
  it('does not divide by zero',()=>expect(percentageChange(110,0)).toBeUndefined());
});
