export const calculateSuccessRate = (data) => {
    const totalRequests = data.length;
    
    const successfulRequests = data.filter(item => {
        const statusCode = `${item.status_code}`;
        return statusCode.startsWith('2')
    }).length;
    
    const successRate = (successfulRequests / totalRequests) * 100;
    
    return Math.round(successRate * 100) / 100;
}

export const calculateAverageResponseTime = (data) => {
    if (data.length === 0) return 0;
    
    const totalResponseTime = data.reduce((sum, item) => 
        sum + item.response_time, 0
    );
    const averageTime = totalResponseTime / data.length;

    return Math.round(averageTime * 100) / 100;
}

export const calculateErrorRate = (data) => {
    const totalRequests = data.length;

    const errorRequests = data.filter(item => 
        item.status_code >= 400
    ).length;
    
    const errorRate = (errorRequests / totalRequests) * 100;
    
    return Math.round(errorRate * 100) / 100;
}

export const abbreviateNumber = (number)=> {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}