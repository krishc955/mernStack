import React from 'react';
import { CheckCircle, Circle, Truck, Package, Home } from 'lucide-react';

const OrderProgressTracker = ({ currentStatus }) => {
  const steps = [
    {
      id: 'pending',
      label: 'Order Placed',
      description: 'We have received your order',
      icon: Circle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      lineColor: 'bg-orange-200'
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      description: 'Order confirmed & being prepared',
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      lineColor: 'bg-blue-200'
    },
    {
      id: 'in process',
      label: 'Processing',
      description: 'Order is being processed',
      icon: Package,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      lineColor: 'bg-yellow-200'
    },
    {
      id: 'shipped',
      label: 'Shipped',
      description: 'Order is on the way',
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      lineColor: 'bg-purple-200'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      description: 'Order has been delivered',
      icon: Home,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      lineColor: 'bg-green-200'
    }
  ];

  const getCurrentStepIndex = () => {
    if (currentStatus === 'rejected') return -1;
    return steps.findIndex(step => step.id === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  const isStepCompleted = (stepIndex) => {
    return currentStepIndex >= stepIndex;
  };

  const isStepActive = (stepIndex) => {
    return currentStepIndex === stepIndex;
  };

  // If order is rejected, show special state
  if (currentStatus === 'rejected') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700">Order Rejected</h3>
              <p className="text-sm text-red-600">Unfortunately, your order could not be processed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Order Progress</h3>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const completed = isStepCompleted(index);
            const active = isStepActive(index);
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                {/* Icon Circle */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                    completed 
                      ? `${step.bgColor} ${step.color} scale-110 shadow-lg` 
                      : active
                      ? `${step.bgColor} ${step.color} scale-105 animate-pulse border-2 border-current`
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium ${
                    completed || active ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </div>
                  <div className={`text-xs mt-1 max-w-[100px] ${
                    completed || active ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </div>
                </div>
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-12 w-full h-1 -z-10">
                    <div className="h-full bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          isStepCompleted(index + 1) ? step.lineColor : 'bg-gray-200'
                        }`}
                        style={{
                          width: isStepCompleted(index + 1) ? '100%' : '0%'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const completed = isStepCompleted(index);
            const active = isStepActive(index);
            
            return (
              <div key={step.id} className="flex items-center space-x-4">
                {/* Icon Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    completed 
                      ? `${step.bgColor} ${step.color} shadow-lg` 
                      : active
                      ? `${step.bgColor} ${step.color} animate-pulse border-2 border-current`
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Step Info */}
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    completed || active ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </div>
                  <div className={`text-xs ${
                    completed || active ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </div>
                </div>

                {/* Status indicator */}
                {completed && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {active && !completed && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Status Message */}
      <div className="mt-6 text-center">
        {currentStepIndex >= 0 && (
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${
              steps[currentStepIndex]?.color.replace('text-', 'bg-')
            } animate-pulse`}></div>
            <span className="text-sm font-medium text-gray-700">
              {steps[currentStepIndex]?.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderProgressTracker;
