//
//  InterfaceController.m
//  Ti 5.5.0 WatchKit Extension
//
//  Created by Appcelerator on 2/18/2016.
//  2016 by Appcelerator, Inc. All rights reserved.
//

#import "InterfaceController.h"


@interface InterfaceController()

@end


@implementation InterfaceController

- (instancetype)init {
    self = [super init];
    
    if (self) {
        
        if ([WCSession isSupported]) {
            WCSession* session = [WCSession defaultSession];
            session.delegate = self;
            [session activateSession];
        }
    }
    
    return self;
}

- (void)awakeWithContext:(id)context {
    [super awakeWithContext:context];

    // Configure interface objects here.
}

- (void)willActivate {
    // This method is called when watch view controller is about to be visible to user
    [super willActivate];
}

- (void)didDeactivate {
    // This method is called when watch view controller is no longer visible
    [super didDeactivate];
}

@end
