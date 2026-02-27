#!/usr/bin/env ts-node
import { IndustryActivationSystem } from './industry-activation-system';
import { IndustryVertical } from '../src/core/types';
/**
 * Industry Configuration Management Script
 * Provides convenient commands for configuring industry verticals
 */
async function main() {
    const activationSystem = new IndustryActivationSystem();
    await activationSystem.initialize();
    const command = process.argv[2];
    switch (command) {
        case 'setup-default':
            await setupDefaultConfiguration(activationSystem);
            break;
        case 'setup-fortune-500':
            await setupFortune500Configuration(activationSystem);
            break;
        case 'setup-startup':
            await setupStartupConfiguration(activationSystem);
            break;
        case 'setup-comprehensive':
            await setupComprehensiveConfiguration(activationSystem);
            break;
        case 'reset':
            await resetConfiguration(activationSystem);
            break;
        default:
            console.log('Industry Configuration Management');
            console.log('Commands:');
            console.log('  setup-default     - Activate core industries (60% GDP coverage)');
            console.log('  setup-fortune-500 - Fortune 500 company configuration');
            console.log('  setup-startup     - Startup company configuration');
            console.log('  setup-comprehensive - All industries (90%+ GDP coverage)');
            console.log('  reset             - Reset all configurations');
    }
}
async function setupDefaultConfiguration(system) {
    console.log('🔧 Setting up default industry configuration...');
    const coreIndustries = [
        IndustryVertical.REAL_ESTATE_RENTAL_LEASING,
        IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES,
        IndustryVertical.MANUFACTURING,
        IndustryVertical.FINANCE_INSURANCE,
        IndustryVertical.INFORMATION_TECHNOLOGY
    ];
    await system.activateIndustries(coreIndustries);
    console.log('✅ Default configuration complete - Core industries activated');
}
async function setupFortune500Configuration(system) {
    console.log('🏢 Setting up Fortune 500 company configuration...');
    const fortune500Industries = [
        IndustryVertical.REAL_ESTATE_RENTAL_LEASING,
        IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES,
        IndustryVertical.GOVERNMENT,
        IndustryVertical.MANUFACTURING,
        IndustryVertical.HEALTHCARE_EDUCATION,
        IndustryVertical.FINANCE_INSURANCE,
        IndustryVertical.WHOLESALE_TRADE,
        IndustryVertical.RETAIL_TRADE,
        IndustryVertical.INFORMATION_TECHNOLOGY,
        IndustryVertical.TRANSPORTATION_WAREHOUSING
    ];
    const configs = new Map();
    fortune500Industries.forEach(industry => {
        configs.set(industry, {
            priority: 'HIGH',
            autoActivate: true,
            contextSensitivity: 0.8,
            performanceMonitoring: true,
            complianceChecking: true
        });
    });
    await system.activateIndustries(fortune500Industries, configs);
    console.log('✅ Fortune 500 configuration complete - Enterprise industries activated');
}
async function setupStartupConfiguration(system) {
    console.log('🚀 Setting up startup company configuration...');
    const startupIndustries = [
        IndustryVertical.INFORMATION_TECHNOLOGY,
        IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES,
        IndustryVertical.FINANCE_INSURANCE
    ];
    const configs = new Map();
    startupIndustries.forEach(industry => {
        configs.set(industry, {
            priority: 'HIGH',
            autoActivate: true,
            contextSensitivity: 0.9,
            performanceMonitoring: true,
            complianceChecking: false // Startups often have lighter compliance needs initially
        });
    });
    await system.activateIndustries(startupIndustries, configs);
    console.log('✅ Startup configuration complete - Technology-focused industries activated');
}
async function setupComprehensiveConfiguration(system) {
    console.log('🌟 Setting up comprehensive industry configuration...');
    const allIndustries = system.getAvailableIndustries();
    const configs = new Map();
    allIndustries.forEach(industry => {
        configs.set(industry, {
            priority: 'MEDIUM',
            autoActivate: true,
            contextSensitivity: 0.7,
            performanceMonitoring: true,
            complianceChecking: true
        });
    });
    await system.activateIndustries(allIndustries, configs);
    const report = await system.generateActivationReport();
    console.log(`✅ Comprehensive configuration complete`);
    console.log(`   - ${report.activeIndustries} industries activated`);
    console.log(`   - ${report.gdpCoverage.toFixed(1)}% GDP coverage`);
}
async function resetConfiguration(system) {
    console.log('🔄 Resetting industry configuration...');
    const activeIndustries = system.getActiveIndustries();
    for (const industry of activeIndustries) {
        await system.deactivateIndustry(industry);
    }
    console.log('✅ Configuration reset complete - All industries deactivated');
}
if (require.main === module) {
    main().catch(console.error);
}
//# sourceMappingURL=configure-industries.js.map