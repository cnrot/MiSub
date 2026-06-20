/*
 * @Author: Rowe inetech@zohomail.com
 * @Date: 2026-06-20 19:29:25
 * @LastEditors: Rowe inetech@zohomail.com
 * @LastEditTime: 2026-06-20 19:32:04
 * @FilePath: \undefinedg:\github\MiSub\tests\unit\template-compatibility.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { describe, it, expect } from 'vitest';
import {
    TEMPLATE_COMPATIBILITY,
    getTemplateCompatibility,
    normalizeTemplateTarget,
    shouldApplyExternalTemplateForTarget
} from '../../functions/modules/subscription/template-compatibility.js';

describe('Template compatibility', () => {
    it('should normalize target formats', () => {
        expect(normalizeTemplateTarget('surge&ver=4')).toBe('surge');
        expect(normalizeTemplateTarget('sing-box')).toBe('singbox');
        expect(normalizeTemplateTarget('clash')).toBe('clash');
    });

    it('should expose per-client compatibility strategy', () => {
        expect(getTemplateCompatibility('clash')).toMatchObject({
            allowExternalTemplate: true,
            strategy: 'external-first'
        });
        expect(getTemplateCompatibility('surge&ver=4')).toMatchObject({
            allowExternalTemplate: true,
            strategy: 'model-driven'
        });
        expect(getTemplateCompatibility('loon')).toMatchObject({
            allowExternalTemplate: true,
            externalTemplateTypes: ['ini'],
            strategy: 'model-driven'
        });
        expect(getTemplateCompatibility('singbox')).toMatchObject({
            allowExternalTemplate: true,
            externalTemplateTypes: ['ini', 'json'],
            strategy: 'model-driven'
        });
        expect(TEMPLATE_COMPATIBILITY.quanx.description).toContain('Quantumult X');
    });

    it('should only allow built-in template rendering for compatible ini templates', () => {
        expect(shouldApplyExternalTemplateForTarget('clash', 'https://example.com/preset.ini')).toBe(true);
        expect(shouldApplyExternalTemplateForTarget('surge&ver=4', 'https://example.com/preset.ini')).toBe(true);
        expect(shouldApplyExternalTemplateForTarget('loon', 'https://example.com/preset.ini')).toBe(true);
        expect(shouldApplyExternalTemplateForTarget('quanx', 'https://example.com/preset.ini')).toBe(true);
        expect(shouldApplyExternalTemplateForTarget('singbox', 'https://example.com/preset.ini')).toBe(true);
        expect(shouldApplyExternalTemplateForTarget('singbox', 'https://example.com/preset.json')).toBe(false);
        expect(shouldApplyExternalTemplateForTarget('clash', 'https://example.com/preset.ini?rev=1')).toBe(true);
        expect(shouldApplyExternalTemplateForTarget('clash', 'https://example.com/subconverter-shellcrash-needs.yaml')).toBe(false);
    });
});
